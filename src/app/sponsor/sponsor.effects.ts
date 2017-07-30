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
    .ofType(sponsorActions.LOAD_FEATURED_SPONSOR)
    .mergeMap(() => this.sponsorService.getFeaturedSponsor())
    .map(sponsors => new sponsorActions.LoadFeaturedSuccessAction(sponsors))
    .catch((err) => {
      console.log(err);
      return Observable.of(new sponsorActions.LoadFeaturedFailedAction());
    });
  @Effect()
  loadSponsors = this.actions$
    .ofType(sponsorActions.LOAD_SPONSORS)
    .mergeMap(() => this.sponsorService.getSponsors())
    .map(sponsors => new sponsorActions.LoadAllSuccessAction(sponsors));

  @Effect()
  loadSponsor = this.actions$
    .ofType(sponsorActions.LOAD_SPONSOR)
    .map(toPayload)
    .mergeMap(id => this.sponsorService.getSponsor(id))
    .map(sponsor => new sponsorActions.LoadSuccessAction(sponsor));

  @Effect()
  loadDetailSponsor = this.actions$
    .ofType(sponsorActions.LOAD_DETAIL_SPONSOR)
    .map(toPayload)
    .mergeMap(id => this.sponsorService.getSponsor(id))
    .map(sponsor => new sponsorActions.LoadDetailSuccessAction(sponsor));

  @Effect()
  saveSponsor = this.actions$
    .ofType(sponsorActions.SAVE_SPONSOR)
    .map(toPayload)
    .mergeMap(sponsor => this.sponsorService.saveSponsor(sponsor)
      .map(savedSponsor => new sponsorActions.SaveSuccessAction(savedSponsor))
      .catch(() => Observable.of(
        new sponsorActions.SaveFailedAction(sponsor))));

  @Effect({ dispatch: false })
  saveSponsorSuccess = this.actions$
    .ofType(sponsorActions.SAVE_SPONSOR_SUCCESS)
    .map(toPayload)
    .do(sponsor => this.router.navigate(['/sponsors/', sponsor._id]));

  @Effect()
  deleteSponsor = this.actions$
    .ofType(sponsorActions.DELETE_SPONSOR)
    .map(toPayload)
    .mergeMap(comp => this.sponsorService.deleteSponsor(comp._id)
      .mapTo(new sponsorActions.DeleteSuccessAction(comp))
      .catch(() => Observable.of(
        new sponsorActions.DeleteFailedAction(comp))));

  @Effect()
  deleteSponsorSuccess = this.actions$
    .ofType(sponsorActions.DELETE_SPONSOR_SUCCESS)
    .mapTo(new LogoutAction());

  constructor(private actions$: Actions,
              private sponsorService: SponsorService,
              private router: Router) {
  }

}
