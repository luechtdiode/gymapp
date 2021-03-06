import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { Club } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromClubs from '../club.actions';
import { AbstractListComponent } from '../../shared/abstract-list.component';
import { RouterPath } from '../../router-path';

@Component({
  selector: 'gymapp-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss'],
})
export class ClubListComponent extends AbstractListComponent<Club> implements OnInit {
  isClubloading: Observable<boolean>;
  message = 'Clubs loading ...';
  registerCLubLink = '/' + RouterPath.REGISTER_CLUB;

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(new fromClubs.LoadAllAction());
    const maxTabs = 6;
    this.connect(fromRoot.getClubs, maxTabs, (club) => club.kind);
    this.isClubloading = this.store.select(fromRoot.isLoadingClub);
  }
}
