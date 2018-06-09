import {of as observableOf, Observable} from 'rxjs';
import {map, tap, mapTo, mergeMap, catchError} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { SponsorService } from './sponsor.service';
import * as sponsorActions from './sponsor.actions';
import { Sponsor } from '../model/backend-typings';
import { LoadDetailAction, SAVE_SPONSOR, SaveAction, DeleteAction } from './sponsor.actions';
import { Router } from '@angular/router';
import { LogoutAction } from '../shared/auth.actions';

@Injectable()
export class SponsorEffects {

  @Effect()
  loadFeaturedSponsor = this.actions$
    .ofType(sponsorActions.LOAD_FEATURED_SPONSOR).pipe(
    mergeMap(() => this.sponsorService.getFeaturedSponsor()),
    map(sponsors => new sponsorActions.LoadFeaturedSuccessAction(sponsors)),
    catchError((err) => {
      console.log(err);
      return observableOf(new sponsorActions.LoadFeaturedFailedAction());
    }),);
  @Effect()
  loadSponsors = this.actions$
    .ofType(sponsorActions.LOAD_SPONSORS).pipe(
    mergeMap(() => this.sponsorService.getSponsors()),
    map(sponsors => new sponsorActions.LoadAllSuccessAction(sponsors)),);

  @Effect()
  loadSponsor = this.actions$
    .ofType(sponsorActions.LOAD_SPONSOR).pipe(
    map((action: sponsorActions.LoadAction) => action.payload),
    mergeMap(id => this.sponsorService.getSponsor(id)),
    map(sponsor => new sponsorActions.LoadSuccessAction(sponsor)),);

  @Effect()
  loadDetailSponsor = this.actions$
    .ofType(sponsorActions.LOAD_DETAIL_SPONSOR).pipe(
    map((action: sponsorActions.LoadDetailAction) => action.payload),
    mergeMap(id => this.sponsorService.getSponsor(id)),
    map(sponsor => new sponsorActions.LoadDetailSuccessAction(sponsor)),);

  @Effect()
  saveSponsor = this.actions$
    .ofType(sponsorActions.SAVE_SPONSOR).pipe(
    map((action: sponsorActions.SaveAction) => action.payload),
    mergeMap(sponsor => this.sponsorService.saveSponsor(sponsor).pipe(
      map(savedSponsor => new sponsorActions.SaveSuccessAction(savedSponsor)),
      catchError(() => observableOf(
        new sponsorActions.SaveFailedAction(sponsor))),)),);

  @Effect({ dispatch: false })
  saveSponsorSuccess = this.actions$
    .ofType(sponsorActions.SAVE_SPONSOR_SUCCESS).pipe(
    map((action: sponsorActions.SaveSuccessAction) => action.payload),
    tap(sponsor => this.router.navigate(['/sponsors/', sponsor._id])),);

  @Effect()
  deleteSponsor = this.actions$
    .ofType(sponsorActions.DELETE_SPONSOR).pipe(
    map((action: sponsorActions.DeleteAction) => action.payload),
    mergeMap(comp => this.sponsorService.deleteSponsor(comp._id).pipe(
      mapTo(new sponsorActions.DeleteSuccessAction(comp)),
      catchError(() => observableOf(
        new sponsorActions.DeleteFailedAction(comp))),)),);

  @Effect()
  deleteSponsorSuccess = this.actions$
    .ofType(sponsorActions.DELETE_SPONSOR_SUCCESS).pipe(
    mapTo(new LogoutAction()));

  constructor(private actions$: Actions,
              private sponsorService: SponsorService,
              private router: Router) {
  }

}
