import { Component, OnInit } from '@angular/core';
import { AbstractListComponent } from '../../shared/abstract-list.component';
import { Observable } from 'rxjs/Observable';
import { Competition } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromCompetitions from '../competition.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';

@Component({
  selector: 'gymapp-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss'],
})
export class CompetitionListComponent extends AbstractListComponent<Competition> implements OnInit {
  isClubloading: Observable<boolean>;
  message = 'Competitions loading ...';

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(fromCompetitions.loadAllAction());
    const maxTabs = 6;
    this.connect(fromRoot.getCompetitions, maxTabs, (competition: Competition) => [competition.kind]);
    this.isClubloading = this.store.select(fromRoot.isLoadingClub);
  }
}
