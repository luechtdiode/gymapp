import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/combineLatest';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { Club } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromClubs from '../club.actions';

@Component({
  selector: 'gymapp-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit, OnDestroy {
  clubs: Club[];
  clubKinds: string[] = [];
  kindmap = {};
  isClubloading: Observable<boolean>;
  selectedTabSubject = new Subject<string>();
  selectedTab: string;
  subs: Subscription[] = [];
  message = 'Clubs loading ...';

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.push(this.selectedTabSubject.subscribe(pred => this.selectedTab = pred));

    this.store.dispatch(fromClubs.loadAllAction());

    const unfilteredClubs = this.store.select(fromRoot.getClubs);
    this.subs.push(unfilteredClubs.subscribe((clubs) => {
      this.kindmap = {};
      clubs.forEach(club => club.kind.forEach(kind => {
        let kindcnt = this.kindmap[kind];
        if (kindcnt === undefined) {
          kindcnt = 1;
        } else {
          kindcnt++;
        }
        this.kindmap[kind] = kindcnt;
      }));
      const allkinds = Object.keys(this.kindmap)
        .map(key => Object.assign({kind: key, cnt: this.kindmap[key], }))
        .sort((a, b) => a.cnt - b.cnt);
      this.clubKinds = ['All', ...allkinds.slice(0, 1).map(kind => kind.kind), 'Other'];
    }));

    this.subs.push(Observable.combineLatest(
      unfilteredClubs, this.selectedTabSubject,
      (clubs, predicate) => {
        const ret = clubs.filter(club => this.filter(club, predicate));
        return ret;
      }
    ).subscribe(clubs => this.clubs = clubs));

    this.isClubloading = this.store.select(fromRoot.isLoadingClub);
    this.selectedTabSubject.next('All');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  select(kind) {
    this.selectedTabSubject.next(kind);
  }

  getKindCount(kind: string) {
    switch (kind) {
      case 'All':
        return Object.keys(this.kindmap)
          .map(k => this.kindmap[k])
          .reduce((a, b) => a + b);

      case 'Other':
        return Object.keys(this.kindmap)
          .filter(k => this.clubKinds.indexOf(k) > -1)
          .map(k => this.kindmap[k])
          .reduce((a, b) => a + b);

      default: {
        return this.kindmap[kind];
      }
    }
  }

  isSelected(kind) {
    if (!this.clubKinds) {
      return false;
    }
    return this.selectedTab === kind;
  }

  private filter(club: Club, kind: string): boolean {
    if (!this.clubKinds) {
      return true;
    }
    switch (kind) {
      case 'All':
        return true;

      case 'Other':
        return club.kind
          .filter(k => this.clubKinds.indexOf(k) === -1)
          .length > 0;

      default:
        return club.kind
          .filter(k => kind === k)
          .length > 0;
    }
  }
}
