import { Component, OnInit } from '@angular/core';
import { AppState, getFeaturedClub, isLoadingFeaturedClub } from '../app-state.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Competition } from '../model/backend-typings';
import { Club } from '../model/backend-typings';
import * as fromRoot from '../app-state.reducer';
import * as fromCompetition from '../competition/competition.actions';
import * as fromClub from '../club/club.actions';

@Component({
  selector: 'gymapp-home',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  competition: Observable<Competition>;
  club: Observable<Club>;
  isFeaturedCompetitionloading: Observable<boolean>;
  isFeaturedClubloading: Observable<boolean>;
  showClub = true;
  showSponsor = true;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(fromCompetition.loadFeaturedAction());
    this.competition = this.store.select(fromRoot.getFeaturedCompetition);
    this.isFeaturedCompetitionloading = this.store.select(fromRoot.isLoadingFeaturedCompetition);

    this.store.dispatch(fromClub.loadFeaturedAction());
    this.club = this.store.select(fromRoot.getFeaturedClub);
    this.isFeaturedClubloading = this.store.select(fromRoot.isLoadingFeaturedClub);
  }

}
