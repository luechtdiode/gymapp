import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Router, RouterState, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getCompetition } from '../../app-state.reducer';
import { LoadAction } from '../competition.actions';
import { Competition } from '../../model/backend-typings';

@Component({
  selector: 'gymapp-competition-detail-page',
  templateUrl: './competition-detail-page.component.html',
  styleUrls: ['./competition-detail-page.component.scss'],
})
export class CompetitionDetailPageComponent implements OnInit {

  competition: Observable<Competition>;
  loadingmessage = 'loading competition details...';

  constructor(public router: Router, public store: Store<AppState>) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    store.dispatch(new LoadAction(root.firstChild.paramMap.get('competitionid')));
    this.competition = this.store.select(getCompetition);
  }

  ngOnInit() {
  }

}
