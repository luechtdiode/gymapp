import { Component, OnInit } from '@angular/core';
import { AppState } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import {Competition} from '../model/backend-typings';
import { Store } from '@ngrx/store';

@Component({
  selector: 'gymapp-home',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  competition: Observable<Competition>;
  isFeaturedCompetitionloading: Observable<boolean>;
  showClub = true;
  showSponsor = true;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.competition = this.store.select(fromRoot.getFeaturedCompetition);
    this.isFeaturedCompetitionloading = this.store.select(fromRoot.isLoadingFeatured);
  }

}
