import { Component, OnInit } from '@angular/core';
import { AppState, getFeaturedClub, isLoadingFeaturedClub } from '../app-state.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Competition, Club, Sponsor } from '../model/backend-typings';
import * as fromRoot from '../app-state.reducer';
import * as fromCompetition from '../competition/competition.actions';
import * as fromClub from '../club/club.actions';
import * as fromSponsor from '../sponsor/sponsor.actions';

@Component({
  selector: 'gymapp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  competition: Observable<Competition>;
  club: Observable<Club>;
  sponsor: Observable<Sponsor>;
  isFeaturedCompetitionloading: Observable<boolean>;
  isFeaturedClubloading: Observable<boolean>;
  isFeaturedSponsorloading: Observable<boolean>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(new fromCompetition.LoadFeaturedAction());
    this.competition = this.store.select(fromRoot.getFeaturedCompetition);
    this.isFeaturedCompetitionloading = this.store.select(fromRoot.isLoadingFeaturedCompetition);

    this.store.dispatch(new fromClub.LoadFeaturedAction());
    this.club = this.store.select(fromRoot.getFeaturedClub);
    this.isFeaturedClubloading = this.store.select(fromRoot.isLoadingFeaturedClub);

    this.store.dispatch(new fromSponsor.LoadFeaturedAction());
    this.sponsor = this.store.select(fromRoot.getFeaturedSponsor);
    this.isFeaturedSponsorloading = this.store.select(fromRoot.isLoadingFeaturedSponsor);
  }

}
