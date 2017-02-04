import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import { User, Club, Sponsor } from '../model/backend-typings';

export const ActionTypes = {
  LOAD_CREDENTIALS:         type('[LOAD_CREDENTIALS] load user creds'),
  REMOVE_CREDENTIALS:       type('[REMOVE_CREDENTIALS] permanent remove user creds'),
  ELEVATE:                  type('[ELEVATE] force user login'),
  LOGIN:                    type('[LOGIN] user login'),
  LOGIN_SUCCESS:            type('[LOGIN_SUCCESS] user login Success'),
  LOGOUT:                   type('[LOGOUT] user logout'),
  LOGOUT_SUCCESS:           type('[LOGOUT_SUCCESS] user logout Success'),
  REGISTER_CLUB:            type('[REGISTER_CLUB] club register'),
  // REGISTER_CLUB_SUCCESS:    type('[REGISTER_CLUB_SUCCESS] club register Success'),
  REGISTER_SPONSOR:         type('[REGISTER_SPONSOR] sponsor register'),
  // REGISTER_SPONSOR_SUCCESS: type('[REGISTER_SPONSOR_SUCCESS] sponsor register Success'),
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
export function registerClubAction(user: User, club: Club): Action {
  return {
    type: ActionTypes.REGISTER_CLUB,
    payload: {user: user, club: club },
  };
}
/* export function registerClubSuccessAction(user: User, club: Club): Action {
  return {
    type: ActionTypes.REGISTER_CLUB_SUCCESS,
    payload: {user: user, club: club },
  };
}*/
export function registerSponsorAction(user: User, sponsor: Sponsor): Action {
  return {
    type: ActionTypes.REGISTER_SPONSOR,
    payload: {user: user, sponsor: sponsor },
  };
}
/*export function registerSponsorSuccessAction(user: User, sponsor: Sponsor): Action {
  return {
    type: ActionTypes.REGISTER_SPONSOR_SUCCESS,
    payload: {user: user, sponsor: sponsor },
  };
}*/
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

