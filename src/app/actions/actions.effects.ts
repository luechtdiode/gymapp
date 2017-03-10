import { ActionTypes, loadAllSuccessAction, loadAllAction } from './actions.actions';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ActionsService } from './actions.service';

@Injectable()
export class ActionsEffects {
  @Effect()
  loadActions = this.actions$
    .ofType(ActionTypes.LOAD_SPONSORACTIONS)
    .startWith(loadAllAction())
    .mergeMap(() => this.actionsService.loadActions())
    .map(a => loadAllSuccessAction(a));

  constructor(private actions$: Actions,
              private actionsService: ActionsService) {}
}
