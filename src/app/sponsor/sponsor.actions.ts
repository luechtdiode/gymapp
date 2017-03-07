import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import { Sponsor } from '../model/backend-typings';

export const ActionTypes = {
  LOAD_SPONSORS:                 type('[SPONSOR] Load SPONSORs'),
  LOAD_SPONSORS_SUCCESS:         type('[SPONSOR] Load SPONSORs Success'),
  SAVE_SPONSOR:                  type('[SPONSOR] Save SPONSOR'),
  SAVE_SPONSOR_SUCCESS:          type('[SPONSOR] Save SPONSOR Success'),
  SAVE_SPONSOR_FAIL:             type('[SPONSOR] Save SPONSOR Fail'),
  DELETE_SPONSOR:                type('[SPONSOR] Delete SPONSOR'),
  DELETE_SPONSOR_SUCCESS:        type('[SPONSOR] Delete SPONSOR Success'),
  DELETE_SPONSOR_FAIL:           type('[SPONSOR] Delete SPONSOR Fail'),
  LOAD_SPONSOR:                  type('[SPONSOR] Load SPONSOR'),
  LOAD_SPONSOR_SUCCESS:          type('[SPONSOR] Load SPONSOR Success'),
  LOAD_FEATURED_SPONSOR:         type('[SPONSOR] Load featured SPONSOR'),
  LOAD_FEATURED_SPONSOR_SUCCESS: type('[SPONSOR] Load featured SPONSOR success'),
  LOAD_FEATURED_SPONSOR_FAIL:    type('[SPONSOR] Load featured SPONSOR fail'),
};

export function loadAllAction(): Action {
  return {
    type: ActionTypes.LOAD_SPONSORS,
  };
}
export function loadAllSuccessAction(payload: Sponsor[]): Action {
  return {
    type: ActionTypes.LOAD_SPONSORS_SUCCESS,
    payload: payload,
  };
}
export function saveAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.SAVE_SPONSOR,
    payload: payload,
  };
}
export function saveSuccessAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.SAVE_SPONSOR_SUCCESS,
    payload: payload,
  };
}
export function saveFailedAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.SAVE_SPONSOR_FAIL,
    payload: payload,
  };
}
export function deleteAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.DELETE_SPONSOR,
    payload: payload,
  };
}
export function deleteSuccessAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.DELETE_SPONSOR_SUCCESS,
    payload: payload,
  };
}
export function deleteFailedAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.DELETE_SPONSOR_FAIL,
    payload: payload,
  };
}
export function loadAction(payload: string): Action {
  return {
    type: ActionTypes.LOAD_SPONSOR,
    payload: payload,
  };
}
export function loadSuccessAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.LOAD_SPONSOR_SUCCESS,
    payload: payload,
  };
}
export function loadFeaturedAction(): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_SPONSOR,
  };
}
export function loadFeaturedSuccessAction(payload: Sponsor): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_SPONSOR_SUCCESS,
    payload: payload,
  };
}
export function loadFeaturedFailedAction(): Action {
  return {
    type: ActionTypes.LOAD_FEATURED_SPONSOR_FAIL,
  };
}
