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
import { Effect, Actions } from '@ngrx/effects';
import { CompetitionService } from './competition.service';
import * as compActions from './competition.actions';
import { SaveAction, SaveSuccessAction, DeleteAction } from './competition.actions';
import { Router } from '@angular/router';

@Injectable()
export class CompetitionEffects {

  @Effect()
  loadCompetition = this.actions$
    .ofType(compActions.LOAD_COMPETITION)
    .mergeMap((action: compActions.LoadAction) => this.compService.getCompetition(action.payload))
    .map(comps => new compActions.LoadDetailSuccessAction(comps))
    .catch((err) => {
      console.log(err);
      return Observable.of(new compActions.LoadDetailFailedAction());
    });
  @Effect()
  loadFeaturedCompetition = this.actions$
    .ofType(compActions.LOAD_FEATURED_COMPETITION)
    .mergeMap(() => this.compService.getFeaturedCompetition())
    .map(comps => new compActions.LoadFeaturedSuccessAction(comps))
    .catch((err) => {
      console.log(err);
      return Observable.of(new compActions.LoadFeaturedFailedAction());
    });
  @Effect()
  loadCompetitions = this.actions$
    .ofType(compActions.LOAD_COMPETITIONS)
    .mergeMap(() => this.compService.getCompetitions())
    .map(comps => new compActions.LoadAllSuccessAction(comps));

  @Effect()
  createCompetition = this.actions$
    .ofType(compActions.CREATE_COMPETITION)
    .map((action: compActions.CreateAction) => action.payload)
    .mergeMap(competition => this.compService.saveCompetition(competition)
      .map(savedCompetition => new compActions.CreateSuccessAction(savedCompetition))
      .catch(() => Observable.of(
        new compActions.SaveFailedAction(competition))));

  @Effect({ dispatch: false })
  createCompetitionSuccess = this.actions$
    .ofType(compActions.CREATE_COMPETITION_SUCCESS)
    .map((action: compActions.CreateSuccessAction) => action.payload)
    .do(competition => this.router.navigate(['/competitions/', {routeParam: competition._id}]));

  @Effect()
  saveCompetition = this.actions$
    .ofType(compActions.SAVE_COMPETITION)
    .map((action: compActions.SaveAction) => action.payload)
    .mergeMap(competition => this.compService.saveCompetition(competition)
      .map(savedCompetition => new compActions.SaveSuccessAction(savedCompetition))
      .catch(() => Observable.of(
        new compActions.SaveFailedAction(competition))));

  @Effect({ dispatch: false })
  saveCompetitionSuccess = this.actions$
    .ofType(compActions.SAVE_COMPETITION_SUCCESS)
    .map((action: compActions.SaveSuccessAction) => action.payload)
    .do(competition => this.router.navigate(['/competitions/', {routeParam: competition._id}]));

  @Effect()
  deleteCompetition = this.actions$
    .ofType(compActions.DELETE_COMPETITION)
    .map((action: compActions.DeleteAction) => action.payload)
    .mergeMap(comp => this.compService.deleteCompetition(comp._id)
      .mapTo(new compActions.DeleteSuccessAction(comp))
      .catch(() => Observable.of(
        new compActions.DeleteFailedAction(comp))));

  constructor(private actions$: Actions,
              private compService: CompetitionService,
              private router: Router) {
  }

}
