import { type } from '../shared/util';
import { Action } from '@ngrx/store';
import { User, Club, Sponsor } from '../model/backend-typings';
import { Profile } from './auth.reducer';


export const LOAD_CREDENTIALS =        '[LOAD_CREDENTIALS] load user creds';
export const REMOVE_CREDENTIALS =      '[REMOVE_CREDENTIALS] permanent remove user creds';
export const ELEVATE =                 '[ELEVATE] force user login';
export const LOGIN =                   '[LOGIN] user login';
export const LOGIN_SUCCESS =           '[LOGIN_SUCCESS] user login Success';
export const LOGOUT =                  '[LOGOUT] user logout';
export const LOGOUT_SUCCESS =          '[LOGOUT_SUCCESS] user logout Success';
export const PROFILE =                 '[PROFILE] loadProfile';
export const SAVE_PROFILE =            '[SAVE_PROFILE] saveProfile';
export const PROFILE_SUCCESS =         '[PROFILE] loadProfile Success';
export const REGISTER_CLUB =           '[REGISTER_CLUB] club register';
  // export const REGISTER_CLUB_SUCCESS =   '[REGISTER_CLUB_SUCCESS] club register Success';
export const REGISTER_SPONSOR =        '[REGISTER_SPONSOR] sponsor register';
  // export const REGISTER_SPONSOR_SUCCESS ='[REGISTER_SPONSOR_SUCCESS] sponsor register Success';
export const CONNECT_TO_SOCIALPROVIDER =     '[CONNECT_TO_FACEBOOK] connect';
export const DISCONNECT_FROM_SOCIALPROVIDER =  '[DISCONNECT_TO_FACEBOOK] disconnect';

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
export class SaveProfileAction implements Action {
  type = SAVE_PROFILE;
  payload: User;
  constructor(user: User) {
    this.payload = user;
  }
}
export class ProfileSuccessAction implements Action {
  type = PROFILE_SUCCESS;
  payload: Profile;
  constructor(profile: Profile) {
    this.payload = profile;
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

export class ConnectToSocialProviderAction implements Action {
  type = CONNECT_TO_SOCIALPROVIDER;
  payload: string;
  constructor(provider: string) {
    this.payload = provider;
  }
}

export class DisconnectFromSocialProviderAction implements Action {
  type = DISCONNECT_FROM_SOCIALPROVIDER;
  payload: any;
  constructor(user: User, provider: string) {
    this.payload = {user: user, provider: provider};
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
  | ConnectToSocialProviderAction
  | DisconnectFromSocialProviderAction
  | ProfileAction
  | SaveProfileAction
  | ProfileSuccessAction;
