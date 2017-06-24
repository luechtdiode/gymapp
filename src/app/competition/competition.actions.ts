import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import {Competition} from '../model/backend-typings';

export const ActionTypes = {
  LOAD_COMPETITIONS:                 type('[COMPETITION] Load COMPETITIONs'),
  LOAD_COMPETITIONS_SUCCESS:         type('[COMPETITION] Load COMPETITIONs Success'),
  SAVE_COMPETITION:                  type('[COMPETITION] Save COMPETITION'),
  SAVE_COMPETITION_SUCCESS:          type('[COMPETITION] Save COMPETITION Success'),
  SAVE_COMPETITION_FAIL:             type('[COMPETITION] Save COMPETITION Fail'),
  DELETE_COMPETITION:                type('[COMPETITION] Delete COMPETITION'),
  DELETE_COMPETITION_SUCCESS:        type('[COMPETITION] Delete COMPETITION Success'),
  DELETE_COMPETITION_FAIL:           type('[COMPETITION] Delete COMPETITION Fail'),
  LOAD_COMPETITION:                  type('[COMPETITION] Load COMPETITION'),
  LOAD_COMPETITION_SUCCESS:          type('[COMPETITION] Load COMPETITION success'),
  LOAD_COMPETITION_FAIL:             type('[COMPETITION] Load COMPETITION fail'),
  LOAD_FEATURED_COMPETITION:         type('[COMPETITION] Load featured COMPETITION'),
  LOAD_FEATURED_COMPETITION_SUCCESS: type('[COMPETITION] Load featured COMPETITION success'),
  LOAD_FEATURED_COMPETITION_FAIL:    type('[COMPETITION] Load featured COMPETITION fail'),
};

export function loadAllAction(): Action {
  return {
    type: ActionTypes.LOAD_COMPETITIONS,
  };
}
export function loadAllSuccessAction(payload: Competition[]): Action {
  return {
    type: ActionTypes.LOAD_COMPETITIONS_SUCCESS,
    payload: payload,
  };
}
export function saveAction(payload: Competition): Action {
  return {
    type: ActionTypes.SAVE_COMPETITION,
    payload: payload,
  };
}
export function saveSuccessAction(payload: Competition): Action {
  return {
    type: ActionTypes.SAVE_COMPETITION_SUCCESS,
    payload: payload,
  };
}
export function saveFailedAction(payload: Competition): Action {
  return {
    type: ActionTypes.SAVE_COMPETITION_FAIL,
    payload: payload,
  };
}
export function deleteAction(payload: Competition): Action {
  return {
    type: ActionTypes.DELETE_COMPETITION,
    payload: payload,
  };
}
export function deleteSuccessAction(payload: Competition): Action {
  return {
    type: ActionTypes.DELETE_COMPETITION_SUCCESS,
    payload: payload,
  };
}
export function deleteFailedAction(payload: Competition): Action {
  return {
    type: ActionTypes.DELETE_COMPETITION_FAIL,
    payload: payload,
  };
}
export function loadAction(payload: string): Action {
  return {
    type: ActionTypes.LOAD_COMPETITION,
    payload: payload,
  };
}
export function loadDetailSuccessAction(payload: Competition): Action {
  return {
    type: ActionTypes.LOAD_COMPETITION_SUCCESS,
    payload: payload,
  };
}
export function loadDetailFailedAction(): Action {
  return {
    type: ActionTypes.LOAD_COMPETITION_FAIL,
  };
}
export function loadFeaturedAction(): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_COMPETITION,
  };
}
export function loadFeaturedSuccessAction(payload: Competition): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_COMPETITION_SUCCESS,
    payload: payload,
  };
}
export function loadFeaturedFailedAction(): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_COMPETITION_FAIL,
  };
}
