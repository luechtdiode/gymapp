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
  selectedTabSubject = new Subject<number>();
  selectedTab: string;
  subs: Subscription[] = [];
  message = 'Clubs loading ...';

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subs.push(this.selectedTabSubject.subscribe(pred => this.selectedTab = this.clubKinds[pred]));

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
      this.clubKinds = ['All', ...allkinds.slice(0, 4).map(kind => kind.kind), 'Other'];
    }));

    this.subs.push(Observable.combineLatest(
      unfilteredClubs, this.selectedTabSubject,
      (clubs, predicate) => {
        const ret = clubs.filter(club => this.filter(club, predicate));
        return ret;
      }
    ).subscribe(clubs => this.clubs = clubs));

    this.isClubloading = this.store.select(fromRoot.isLoadingClub);
    this.selectedTabSubject.next(0);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  select(kind) {
    const index = this.clubKinds.indexOf(kind);
    if (index === -1) {
      this.selectedTabSubject.next(0);
    } else {
      this.selectedTabSubject.next(index);
    }
  }

  getKindCount(kind) {
    return this.kindmap[kind];
  }

  isSelected(kind) {
    if (!this.clubKinds) {
      return false;
    }
    return this.selectedTab === kind;
  }

  private filter(club: Club, predicate: number): boolean {
    if (predicate === 0) {
      return true;
    }
    if (!this.clubKinds) {
      return true;
    }
    const pred = this.clubKinds[predicate];
    const forAll = club.kind.reduce((acc, kind) => acc || pred === kind, false);
    if (predicate < this.clubKinds.length) {
      return forAll;
    } else {
      return !forAll;
    }
  }
}
