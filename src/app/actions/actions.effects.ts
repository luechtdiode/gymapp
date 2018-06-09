
import {map, mergeMap, startWith} from 'rxjs/operators';
import * as actionActions from './actions.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActionsService } from './actions.service';
import { defer ,  Observable ,  of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ActionsEffects {
/*   @Effect()
    init$: Observable<Action> = defer(() => {
      return of(new actionActions.LoadAllAction());
    }); */

  @Effect()
  loadActions = this.actions$
    .ofType(actionActions.LOAD_SPONSORACTIONS).pipe(
    startWith(new actionActions.LoadAllAction()),
    mergeMap(() => this.actionsService.loadActions()),
    map(a => new actionActions.LoadAllSuccessAction(a)),);

  constructor(private actions$: Actions,
              private actionsService: ActionsService) {}
}
