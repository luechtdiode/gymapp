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
import { ActionTypes,
  loadFeaturedAction,
  loadFeaturedSuccessAction,
  loadFeaturedFailedAction,
  loadAllSuccessAction,
  loadAllAction,
  loadSuccessAction,
  saveSuccessAction,
  saveFailedAction,
  deleteSuccessAction,
  deleteFailedAction,
  loadDetailSuccessAction} from './club.actions';
import { go } from '@ngrx/router-store';
import { logoutAction } from '../shared/auth.actions';

@Injectable()
export class ClubEffects {

  @Effect()
  loadFeaturedClub = this.actions$
    .ofType(ActionTypes.LOAD_FEATURED_CLUB)
    .mergeMap(() => this.clubService.getFeaturedClub())
    .map(clubs => loadFeaturedSuccessAction(clubs))
    .catch((err) => {
      console.log(err);
      return Observable.of(loadFeaturedFailedAction());
    });
  @Effect()
  loadClubs = this.actions$
    .ofType(ActionTypes.LOAD_CLUBS)
    .mergeMap(() => this.clubService.getClubs())
    .map(clubs => loadAllSuccessAction(clubs));

  @Effect()
  loadClub = this.actions$
    .ofType(ActionTypes.LOAD_CLUB)
    .map(action => action.payload)
    .mergeMap(id => this.clubService.getClub(id))
    .map(club => loadSuccessAction(club));

  @Effect()
  loadDetailClub = this.actions$
    .ofType(ActionTypes.LOAD_DETAIL_CLUB)
    .map(action => action.payload)
    .mergeMap(id => this.clubService.getClub(id))
    .map(club => loadDetailSuccessAction(club));

  @Effect()
  saveClub = this.actions$
    .ofType(ActionTypes.SAVE_CLUB)
    .map(action => action.payload)
    .mergeMap(club => this.clubService.saveClub(club)
      .map(savedClub => saveSuccessAction(savedClub))
      .catch(() => Observable.of(
        saveFailedAction(club))));

  @Effect()
  saveClubSuccess = this.actions$
    .ofType(ActionTypes.SAVE_CLUB_SUCCESS)
    .map((action) => go(['/clubs/', action.payload._id]));

  @Effect()
  deleteClub = this.actions$
    .ofType(ActionTypes.DELETE_CLUB)
    .map(action => action.payload)
    .mergeMap(comp => this.clubService.deleteClub(comp._id)
      .mapTo(deleteSuccessAction(comp))
      .catch(() => Observable.of(
        deleteFailedAction(comp))));

  @Effect()
  deleteSponsorSuccess = this.actions$
    .ofType(ActionTypes.DELETE_CLUB_SUCCESS)
    .mapTo(logoutAction());

  constructor(private actions$: Actions,
              private clubService: ClubService) {
  }

}
