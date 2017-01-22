import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import { User } from '../model/backend-typings';

export const ActionTypes = {
  LOAD_CREDENTIALS:         type('[LOAD_CREDENTIALS] load user creds'),
  REMOVE_CREDENTIALS:       type('[REMOVE_CREDENTIALS] permanent remove user creds'),
  ELEVATE:                  type('[ELEVATE] force user login'),
  LOGIN:                    type('[LOGIN] user login'),
  LOGIN_SUCCESS:            type('[LOGIN_SUCCESS] user login Success'),
  LOGOUT:                   type('[LOGOUT] user logout'),
  LOGOUT_SUCCESS:           type('[LOGOUT_SUCCESS] user logout Success'),
  REGISTER:                 type('[REGISTER] user register'),
  REGISTER_SUCCESS:         type('[REGISTER_SUCCESS] user register Success'),
};

export function loadCredentialsAction(): Action {
  return {
    type: ActionTypes.LOAD_CREDENTIALS,
  };
}
export function removeCredentialsAction(): Action {
  return {
    type: ActionTypes.REMOVE_CREDENTIALS,
  };
}
export function elevateAction(backUrl: string): Action {
  return {
    type: ActionTypes.ELEVATE,
    payload: backUrl,
  };
}
export function loginAction(remember: boolean, user: User, backUrl: string = undefined): Action {
  return {
    type: ActionTypes.LOGIN,
    payload: {user: user, rememberMe: remember, backUrl: backUrl},
  };
}
export function loginSuccessAction(user: User, backUrl: string = undefined): Action {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {user: user, backUrl: backUrl },
  };
}
export function logoutAction(): Action {
  return {
    type: ActionTypes.LOGOUT,
  };
}
export function logoutSuccessAction(): Action {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
}

