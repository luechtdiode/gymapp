
import { Action as StoreAction } from '@ngrx/store';
import { Action as SponsorAction} from '../model/backend-typings';
import * as actionsActions from './actions.actions';

export interface ActionsState {
  actions: SponsorAction[];
};

const initialState: ActionsState = {
  actions: [],
};

export function reducer(state = initialState, action: actionsActions.Actions): ActionsState {
  switch (action.type) {
    case actionsActions.LOAD_SPONSORACTIONS_SUCCESS:
      return Object.assign({}, state, {actions: action.payload});
    default:
      return state;
  }
}

export const getSponsorActions = (state: ActionsState) => state.actions;
