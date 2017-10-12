import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import { User, Club, Sponsor } from '../model/backend-typings';


export const LOAD_CREDENTIALS =        '[LOAD_CREDENTIALS] load user creds';
export const REMOVE_CREDENTIALS =      '[REMOVE_CREDENTIALS] permanent remove user creds';
export const ELEVATE =                 '[ELEVATE] force user login';
export const LOGIN =                   '[LOGIN] user login';
export const LOGIN_SUCCESS =           '[LOGIN_SUCCESS] user login Success';
export const LOGOUT =                  '[LOGOUT] user logout';
export const LOGOUT_SUCCESS =          '[LOGOUT_SUCCESS] user logout Success';
export const PROFILE =                 '[PROFILE] loadProfile';
export const PROFILE_SUCCESS =         '[PROFILE] loadProfile Success';
export const REGISTER_CLUB =           '[REGISTER_CLUB] club register';
  // export const REGISTER_CLUB_SUCCESS =   '[REGISTER_CLUB_SUCCESS] club register Success';
export const REGISTER_SPONSOR =        '[REGISTER_SPONSOR] sponsor register';
  // export const REGISTER_SPONSOR_SUCCESS ='[REGISTER_SPONSOR_SUCCESS] sponsor register Success';
export const CONNECT_TO_FACEBOOK =     '[CONNECT_TO_FACEBOOK] connect';
export const DISCONNECT_TO_FACEBOOK =  '[DISCONNECT_TO_FACEBOOK] disconnect';

export class LoadCredentialsAction implements Action {
  type = LOAD_CREDENTIALS;
  payload: any = undefined;
};

export class RemoveCredentialsAction implements Action {
  type = REMOVE_CREDENTIALS;
  payload: any = undefined;
};

export class ElevateAction implements Action {
  type = ELEVATE;
  constructor(public payload: string) {}
}
export class RegisterClubAction implements Action {
  type = REGISTER_CLUB;
  payload: any;
  constructor(user: User, club: Club) {
    this.payload =  {user: user, club: club };
  }
}
/* export class registerClubSuccessAction(user: User, club: Club): Action {
  type = REGISTER_CLUB_SUCCESS;
    paylo
    : {user: user, club: club },
  };
}*/
export class RegisterSponsorAction implements Action {
  type = REGISTER_SPONSOR;
  payload: any;
  constructor(user: User, sponsor: Sponsor) {
    this.payload = {user: user, sponsor: sponsor };
  }
}
/*export class registerSponsorSuccessAction(user: User, sponsor: Sponsor): Action {
  return {
    type: ActionTypes.REGISTER_SPONSOR_SUCCESS,
    payload: {user: user, sponsor: sponsor },
  };
}*/
export class ProfileAction implements Action {
  type = PROFILE;
  payload: any;
}
export class ProfileSuccessAction implements Action {
  type = PROFILE_SUCCESS;
  payload: any;
  constructor(token: string, user: User, sponsor: Sponsor, club: Club) {
    this.payload = {token: token, user: user, sponsor: sponsor, club: club };
  }
}
export class LoginAction implements Action {
  type = LOGIN;
  payload: any;
  constructor(remember: boolean, user: User, backUrl: string = undefined) {
    this.payload = {user: user, rememberMe: remember, backUrl: backUrl};
  }
}
export class LoginSuccessAction implements Action {
  type = LOGIN_SUCCESS;
  payload: any;
  constructor(user: User, backUrl: string = undefined) {
    this.payload = {user: user, backUrl: backUrl };
  }
}
export class LogoutAction implements Action {
  type = LOGOUT;
  payload: any = undefined;
}
export class LogoutSuccessAction implements Action {
  type = LOGOUT_SUCCESS;
  payload: any = undefined;
}

export class ConnectToFacebookAction implements Action {
  type = CONNECT_TO_FACEBOOK;
  payload: any = undefined;
}

export class DisconnectToFacebookAction implements Action {
  type = DISCONNECT_TO_FACEBOOK;
  payload: any;
  constructor(user: User) {
    this.payload = {user: user};
  }
}

export type Actions =
    LoadCredentialsAction
  | RemoveCredentialsAction
  | ElevateAction
  | RegisterClubAction
  | RegisterSponsorAction
  | LoginAction
  | LoginSuccessAction
  | LogoutAction
  | LogoutSuccessAction
  | ConnectToFacebookAction
  | DisconnectToFacebookAction
  | ProfileAction
  | ProfileSuccessAction;
