import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { ClubService } from './club.service';
import * as clubActions from './club.actions';
import { go } from '@ngrx/router-store';
import { logoutAction } from '../shared/auth.actions';
import { LoadDetailAction, SaveAction, SaveSuccessAction, DeleteAction } from './club.actions';

@Injectable()
export class ClubEffects {

  @Effect()
  loadFeaturedClub = this.actions$
    .ofType(clubActions.LOAD_FEATURED_CLUB)
    .mergeMap(() => this.clubService.getFeaturedClub())
    .map(clubs => new clubActions.LoadFeaturedSuccessAction(clubs))
    .catch((err) => {
      console.log(err);
      return Observable.of(new clubActions.LoadFeaturedFailedAction());
    });
  @Effect()
  loadClubs = this.actions$
    .ofType(clubActions.LOAD_CLUBS)
    .mergeMap(() => this.clubService.getClubs())
    .map(clubs => new clubActions.LoadAllSuccessAction(clubs));

  @Effect()
  loadClub = this.actions$
    .ofType(clubActions.LOAD_CLUB)
    .map((action: clubActions.LoadAction) => action.payload)
    .mergeMap(id => this.clubService.getClub(id))
    .map(club => new clubActions.LoadSuccessAction(club));

  @Effect()
  loadDetailClub = this.actions$
    .ofType(clubActions.LOAD_DETAIL_CLUB)
    .map((action: clubActions.LoadDetailAction) => action.payload)
    .mergeMap(id => this.clubService.getClub(id))
    .map(club => new clubActions.LoadDetailSuccessAction(club));

  @Effect()
  saveClub = this.actions$
    .ofType(clubActions.SAVE_CLUB)
    .map((action: clubActions.SaveAction) => action.payload)
    .mergeMap(club => this.clubService.saveClub(club)
      .map(savedClub => new clubActions.SaveSuccessAction(savedClub))
      .catch(() => Observable.of(
        new clubActions.SaveFailedAction(club))));

  @Effect()
  saveClubSuccess = this.actions$
    .ofType(clubActions.SAVE_CLUB_SUCCESS)
    .map((action: clubActions.SaveSuccessAction) => go(['/clubs/', action.payload._id]));

  @Effect()
  deleteClub = this.actions$
    .ofType(clubActions.DELETE_CLUB)
    .map((action: clubActions.DeleteAction) => action.payload)
    .mergeMap(comp => this.clubService.deleteClub(comp._id)
      .mapTo(new clubActions.DeleteSuccessAction(comp))
      .catch(() => Observable.of(
        new clubActions.DeleteFailedAction(comp))));

  @Effect()
  deleteSponsorSuccess = this.actions$
    .ofType(clubActions.DELETE_CLUB_SUCCESS)
    .mapTo(logoutAction());

  constructor(private actions$: Actions,
              private clubService: ClubService) {
  }

}
