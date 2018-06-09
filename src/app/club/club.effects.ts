
import {of as observableOf, Observable} from 'rxjs';
import {map, catchError, tap, mapTo, mergeMap} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ClubService } from './club.service';
import * as clubActions from './club.actions';
import { LogoutAction } from '../shared/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class ClubEffects {

  @Effect()
  loadFeaturedClub = this.actions$
    .ofType(clubActions.LOAD_FEATURED_CLUB).pipe(
    mergeMap(() => this.clubService.getFeaturedClub()),
    map(clubs => new clubActions.LoadFeaturedSuccessAction(clubs)),
    catchError((err) => {
      console.log(err);
      return observableOf(new clubActions.LoadFeaturedFailedAction());
    }),);
  @Effect()
  loadClubs = this.actions$
    .ofType(clubActions.LOAD_CLUBS).pipe(
    mergeMap(() => this.clubService.getClubs()),
    map(clubs => new clubActions.LoadAllSuccessAction(clubs)),);

  @Effect()
  loadClub = this.actions$
    .ofType(clubActions.LOAD_CLUB).pipe(
    map((action: clubActions.LoadAction) => action.payload),
    mergeMap(id => this.clubService.getClub(id)),
    map(club => new clubActions.LoadSuccessAction(club)),);

  @Effect()
  loadDetailClub = this.actions$
    .ofType(clubActions.LOAD_DETAIL_CLUB).pipe(
    map((action: clubActions.LoadDetailAction) => action.payload),
    mergeMap(id => this.clubService.getClub(id)),
    map(club => new clubActions.LoadDetailSuccessAction(club)),);

  @Effect()
  saveClub = this.actions$
    .ofType(clubActions.SAVE_CLUB).pipe(
    map((action: clubActions.SaveAction) => action.payload),
    mergeMap(club => this.clubService.saveClub(club).pipe(
      map(savedClub => new clubActions.SaveSuccessAction(savedClub)),
      catchError(() => observableOf(
        new clubActions.SaveFailedAction(club))),)),);

  @Effect({ dispatch: false })
  saveClubSuccess = this.actions$
    .ofType(clubActions.SAVE_CLUB_SUCCESS).pipe(
    tap((action: clubActions.SaveSuccessAction) => this.router.navigate(['/clubs/', action.payload._id])));

  @Effect()
  deleteClub = this.actions$
    .ofType(clubActions.DELETE_CLUB).pipe(
    map((action: clubActions.DeleteAction) => action.payload),
    mergeMap(comp => this.clubService.deleteClub(comp._id).pipe(
      mapTo(new clubActions.DeleteSuccessAction(comp)),
      catchError(() => observableOf(
        new clubActions.DeleteFailedAction(comp))),)),);

  @Effect()
  deleteClubSuccess = this.actions$
    .ofType(clubActions.DELETE_CLUB_SUCCESS).pipe(
    mapTo(new LogoutAction()));

  constructor(private actions$: Actions,
              private clubService: ClubService,
              private router: Router) {
  }

}
