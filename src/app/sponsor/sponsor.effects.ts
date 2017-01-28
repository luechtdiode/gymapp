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
  deleteFailedAction } from './sponsor.actions';
import { go } from '@ngrx/router-store';

@Injectable()
export class SponsorEffects {

  @Effect()
  loadFeaturedSponsor = this.actions$
    .ofType(ActionTypes.LOAD_FEATURED_SPONSOR)
    .mergeMap(() => this.compService.getFeaturedSponsor())
    .map(sponsors => loadFeaturedSuccessAction(sponsors))
    .catch((err) => {
      console.log(err);
      return Observable.of(loadFeaturedFailedAction());
    });
  @Effect()
  loadSponsors = this.actions$
    .ofType(ActionTypes.LOAD_SPONSORS)
    .mergeMap(() => this.compService.getSponsors())
    .map(sponsors => loadAllSuccessAction(sponsors));

  @Effect()
  saveSponsor = this.actions$
    .ofType(ActionTypes.SAVE_SPONSOR)
    .map(action => action.payload)
    .mergeMap(sponsor => this.compService.saveSponsor(sponsor)
      .map(savedSponsor => saveSuccessAction(savedSponsor))
      .catch(() => Observable.of(
        saveFailedAction(sponsor)
      ))
    );

  @Effect()
  saveSponsorSuccess = this.actions$
    .ofType(ActionTypes.SAVE_SPONSOR_SUCCESS)
    .map(action => action.payload)
    .do(sponsor => {
      go(['/sponsors/', {routeParam: sponsor._id}]);
    }).filter(() => false);

  @Effect()
  deleteSponsor = this.actions$
    .ofType(ActionTypes.DELETE_SPONSOR)
    .map(action => action.payload)
    .mergeMap(comp => this.compService.deleteSponsor(comp._id)
      .mapTo(deleteSuccessAction(comp))
      .catch(() => Observable.of(
        deleteFailedAction(comp)
      ))
    );

  constructor(private actions$: Actions,
              private compService: SponsorService) {
  }

}
