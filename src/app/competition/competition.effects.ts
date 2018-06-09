
import {of as observableOf, Observable} from 'rxjs';

import {mapTo, mergeMap, map, catchError, tap} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';
import { Action } from '@ngrx/store';







import { Effect, Actions } from '@ngrx/effects';
import { CompetitionService } from './competition.service';
import * as compActions from './competition.actions';
import { SaveAction, SaveSuccessAction, DeleteAction } from './competition.actions';
import { Router } from '@angular/router';

@Injectable()
export class CompetitionEffects {

  @Effect()
  loadCompetition = this.actions$
    .ofType(compActions.LOAD_COMPETITION).pipe(
    mergeMap((action: compActions.LoadAction) => this.compService.getCompetition(action.payload)),
    map(comps => new compActions.LoadDetailSuccessAction(comps)),
    catchError((err) => {
      console.log(err);
      return observableOf(new compActions.LoadDetailFailedAction());
    }),);
  @Effect()
  loadFeaturedCompetition = this.actions$
    .ofType(compActions.LOAD_FEATURED_COMPETITION).pipe(
    mergeMap(() => this.compService.getFeaturedCompetition()),
    map(comps => new compActions.LoadFeaturedSuccessAction(comps)),
    catchError((err) => {
      console.log(err);
      return observableOf(new compActions.LoadFeaturedFailedAction());
    }),);
  @Effect()
  loadCompetitions = this.actions$
    .ofType(compActions.LOAD_COMPETITIONS).pipe(
    mergeMap(() => this.compService.getCompetitions()),
    map(comps => new compActions.LoadAllSuccessAction(comps)),);

  @Effect()
  createCompetition = this.actions$
    .ofType(compActions.CREATE_COMPETITION).pipe(
    map((action: compActions.CreateAction) => action.payload),
    mergeMap(competition => this.compService.saveCompetition(competition).pipe(
      map(savedCompetition => new compActions.CreateSuccessAction(savedCompetition)),
      catchError(() => observableOf(
        new compActions.SaveFailedAction(competition))),)),);

  @Effect({ dispatch: false })
  createCompetitionSuccess = this.actions$
    .ofType(compActions.CREATE_COMPETITION_SUCCESS).pipe(
    map((action: compActions.CreateSuccessAction) => action.payload),
    tap(competition => this.router.navigate(['/competitions/', {routeParam: competition._id}])),);

  @Effect()
  saveCompetition = this.actions$
    .ofType(compActions.SAVE_COMPETITION).pipe(
    map((action: compActions.SaveAction) => action.payload),
    mergeMap(competition => this.compService.saveCompetition(competition).pipe(
      map(savedCompetition => new compActions.SaveSuccessAction(savedCompetition)),
      catchError(() => observableOf(
        new compActions.SaveFailedAction(competition))),)),);

  @Effect({ dispatch: false })
  saveCompetitionSuccess = this.actions$
    .ofType(compActions.SAVE_COMPETITION_SUCCESS).pipe(
    map((action: compActions.SaveSuccessAction) => action.payload),
    tap(competition => this.router.navigate(['/competitions/', {routeParam: competition._id}])),);

  @Effect()
  deleteCompetition = this.actions$
    .ofType(compActions.DELETE_COMPETITION).pipe(
    map((action: compActions.DeleteAction) => action.payload),
    mergeMap(comp => this.compService.deleteCompetition(comp._id).pipe(
      mapTo(new compActions.DeleteSuccessAction(comp)),
      catchError(() => observableOf(
        new compActions.DeleteFailedAction(comp))),)),);

  constructor(private actions$: Actions,
              private compService: CompetitionService,
              private router: Router) {
  }

}
