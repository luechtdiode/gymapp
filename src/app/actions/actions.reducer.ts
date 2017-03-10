
import { Action as StoreAction } from '@ngrx/store';
import { Action as SponsorAction} from '../model/backend-typings';
import * as actions from './actions.actions';

export interface ActionsState {
  actions: SponsorAction[];
};

const initialState: ActionsState = {
  actions: [],
};

export function reducer(state = initialState, action: StoreAction): ActionsState {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SPONSORACTIONS_SUCCESS:
      return Object.assign({}, state, {actions: action.payload});
    default:
      return state;
  }
}

export const getSponsorActions = (state: ActionsState) => state.actions;
