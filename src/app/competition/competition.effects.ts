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
import { CompetitionService } from './competition.service';
import { ActionTypes,
  loadFeaturedAction,
  loadFeaturedSuccessAction,
  loadFeaturedFailedAction,
  loadAllSuccessAction,
  loadAllAction,
  saveSuccessAction,
  saveFailedAction,
  deleteSuccessAction,
  deleteFailedAction } from './competition.actions';
import { go } from '@ngrx/router-store';

@Injectable()
export class CompetitionEffects {

  @Effect()
  loadFeaturedCompetition = this.actions$
    .ofType(ActionTypes.LOAD_FEATURED_COMPETITION)
    .mergeMap(() => this.compService.getFeaturedCompetition())
    .map(comps => loadFeaturedSuccessAction(comps))
    .catch((err) => {
      console.log(err);
      return Observable.of(loadFeaturedFailedAction());
    });
  @Effect()
  loadCompetitions = this.actions$
    .ofType(ActionTypes.LOAD_COMPETITIONS)
    .mergeMap(() => this.compService.getCompetitions())
    .map(comps => loadAllSuccessAction(comps));

  @Effect()
  saveCompetition = this.actions$
    .ofType(ActionTypes.SAVE_COMPETITION)
    .map(action => action.payload)
    .mergeMap(competition => this.compService.saveCompetition(competition)
      .map(savedCompetition => saveSuccessAction(savedCompetition))
      .catch(() => Observable.of(
        saveFailedAction(competition))));

  @Effect()
  saveCompetitionSuccess = this.actions$
    .ofType(ActionTypes.SAVE_COMPETITION_SUCCESS)
    .map(action => action.payload)
    .map(competition => go(['/competitions/', {routeParam: competition._id}]));

  @Effect()
  deleteCompetition = this.actions$
    .ofType(ActionTypes.DELETE_COMPETITION)
    .map(action => action.payload)
    .mergeMap(comp => this.compService.deleteCompetition(comp._id)
      .mapTo(deleteSuccessAction(comp))
      .catch(() => Observable.of(
        deleteFailedAction(comp))));

  constructor(private actions$: Actions,
              private compService: CompetitionService) {
  }

}
