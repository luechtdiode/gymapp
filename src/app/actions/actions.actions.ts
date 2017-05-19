import { type } from '../shared/util';
import { Action as StoreAction } from '@ngrx/store';
import { Action as SponsorAction } from '../model/backend-typings';

export const ActionTypes = {
  LOAD_SPONSORACTIONS:         type('[ACTIONS] Load LOAD_SPONSORACTIONS'),
  LOAD_SPONSORACTIONS_SUCCESS: type('[ACTIONS] Load LOAD_SPONSORACTIONS Success'),
};

export function loadAllAction(): StoreAction {
  return {
    type: ActionTypes.LOAD_SPONSORACTIONS,
  };
}

export function loadAllSuccessAction(actions: SponsorAction[]) {
  return {
    type: ActionTypes.LOAD_SPONSORACTIONS_SUCCESS,
    payload: actions,
  };
}
