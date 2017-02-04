import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import { Club } from '../model/backend-typings';

export const ActionTypes = {
  LOAD_CLUBS:                 type('[CLUB] Load CLUBs'),
  LOAD_CLUBS_SUCCESS:         type('[CLUB] Load CLUBs Success'),
  SAVE_CLUB:                  type('[CLUB] Save CLUB'),
  SAVE_CLUB_SUCCESS:          type('[CLUB] Save CLUB Success'),
  SAVE_CLUB_FAIL:             type('[CLUB] Save CLUB Fail'),
  DELETE_CLUB:                type('[CLUB] Delete CLUB'),
  DELETE_CLUB_SUCCESS:        type('[CLUB] Delete CLUB Success'),
  DELETE_CLUB_FAIL:           type('[CLUB] Delete CLUB Fail'),
  LOAD_CLUB:                  type('[CLUB] Load CLUB'),
  LOAD_CLUB_SUCCESS:          type('[LOAD_CLUB_SUCCESS] Load CLUB Success'),
  LOAD_FEATURED_CLUB:         type('[CLUB] Load featured CLUB'),
  LOAD_FEATURED_CLUB_SUCCESS: type('[CLUB] Load featured CLUB success'),
  LOAD_FEATURED_CLUB_FAIL:    type('[CLUB] Load featured CLUB fail'),
};

export function loadAllAction(): Action {
  return {
    type: ActionTypes.LOAD_CLUBS,
  };
}
export function loadAllSuccessAction(payload: Club[]): Action {
  return {
    type: ActionTypes.LOAD_CLUBS_SUCCESS,
    payload: payload,
  };
}
export function saveAction(payload: Club): Action {
  return {
    type: ActionTypes.SAVE_CLUB,
    payload: payload,
  };
}
export function saveSuccessAction(payload: Club): Action {
  return {
    type: ActionTypes.SAVE_CLUB_SUCCESS,
    payload: payload,
  };
}
export function saveFailedAction(payload: Club): Action {
  return {
    type: ActionTypes.SAVE_CLUB_FAIL,
    payload: payload,
  };
}
export function deleteAction(payload: Club): Action {
  return {
    type: ActionTypes.DELETE_CLUB,
    payload: payload,
  };
}
export function deleteSuccessAction(payload: Club): Action {
  return {
    type: ActionTypes.DELETE_CLUB_SUCCESS,
    payload: payload,
  };
}
export function deleteFailedAction(payload: Club): Action {
  return {
    type: ActionTypes.DELETE_CLUB_FAIL,
    payload: payload,
  };
}
export function loadAction(payload: string): Action {
  return {
    type: ActionTypes.LOAD_CLUB,
    payload: payload,
  };
}
export function loadSuccessAction(payload: Club): Action {
  return {
    type: ActionTypes.LOAD_CLUB_SUCCESS,
    payload: payload,
  };
}
export function loadFeaturedAction(): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_CLUB,
  };
}
export function loadFeaturedSuccessAction(payload: Club): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_CLUB_SUCCESS,
    payload: payload,
  };
}
export function loadFeaturedFailedAction(): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_CLUB_FAIL,
  };
}
