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
import { ActionTypes,
  loadFeaturedAction,
  loadFeaturedSuccessAction,
  loadFeaturedFailedAction,
  loadAllSuccessAction,
  loadAllAction,
  saveSuccessAction,
  saveFailedAction,
  deleteSuccessAction,
  deleteFailedAction, loadSuccessAction,
} from './sponsor.actions';
import { go } from '@ngrx/router-store';
import { Sponsor } from '../model/backend-typings';

@Injectable()
export class SponsorEffects {

  @Effect()
  loadFeaturedSponsor = this.actions$
    .ofType(ActionTypes.LOAD_FEATURED_SPONSOR)
    .mergeMap(() => this.sponsorService.getFeaturedSponsor())
    .map(sponsors => loadFeaturedSuccessAction(sponsors))
    .catch((err) => {
      console.log(err);
      return Observable.of(loadFeaturedFailedAction());
    });
  @Effect()
  loadSponsors = this.actions$
    .ofType(ActionTypes.LOAD_SPONSORS)
    .mergeMap(() => this.sponsorService.getSponsors())
    .map(sponsors => loadAllSuccessAction(sponsors));

  @Effect()
  loadSponsor = this.actions$
    .ofType(ActionTypes.LOAD_SPONSOR)
    .map(action => action.payload)
    .mergeMap(id => this.sponsorService.getSponsor(id))
    .map(sponsor => loadSuccessAction(sponsor));

  @Effect()
  saveSponsor = this.actions$
    .ofType(ActionTypes.SAVE_SPONSOR)
    .map(action => action.payload)
    .mergeMap(sponsor => this.sponsorService.saveSponsor(sponsor)
      .map(savedSponsor => saveSuccessAction(savedSponsor))
      .catch(() => Observable.of(
        saveFailedAction(sponsor))));

  @Effect()
  saveSponsorSuccess = this.actions$
    .ofType(ActionTypes.SAVE_SPONSOR_SUCCESS)
    .map(action => action.payload)
    .map(sponsor => go(['/sponsors/', {routeParam: sponsor._id}]));

  @Effect()
  deleteSponsor = this.actions$
    .ofType(ActionTypes.DELETE_SPONSOR)
    .map(action => action.payload)
    .mergeMap(comp => this.sponsorService.deleteSponsor(comp._id)
      .mapTo(deleteSuccessAction(comp))
      .catch(() => Observable.of(
        deleteFailedAction(comp))));

  constructor(private actions$: Actions,
              private sponsorService: SponsorService) {
  }

}
