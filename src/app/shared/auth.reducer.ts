import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Competition, User, Sponsor, Club } from '../model/backend-typings';
import * as auth from './auth.actions';

export interface Profile {
    token: string;
    user: User;
    socialAccounts: any;
}
export interface AuthState {
    backUrl: string;
    token?: string;
    profile?: Profile;
    user?: User;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    backUrl: undefined,
    profile: undefined,
    token: undefined,
    user: {
        username: undefined,
        email: undefined,
        firstname: undefined,
        lastname: undefined,
        isMemberOfSponsor: undefined,
        isMemberOfClub: undefined,
    },
    isAuthenticated: false,
};

export function reducer(state = initialState, action: auth.Actions): AuthState {
    switch (action.type) {
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.REMOVE_CREDENTIALS: {
            return Object.assign({}, initialState);
        }
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.ELEVATE: {
            const backurl = action.payload;
            console.log('start login from: ', backurl );
            return Object.assign({}, state, initialState, {
                backUrl: backurl,
            });
        }
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                token: action.payload.user.token,
                user: action.payload.user,
                isAuthenticated: action.payload.user.success,
            });
        }
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.PROFILE: {
            const token = action.payload;
            if (token !== undefined) {
                const newstate = Object.assign({}, state, {
                    token: token,
                    isAuthenticated: true,
                });
                return newstate;
            } else {
                return state;
            }
        }
        case auth.PROFILE_SUCCESS: {
            const profile = action.payload as Profile;
            const newstate = Object.assign({}, state, {
                user: Object.assign({}, state.user, profile.user),
                isAuthenticated: true,
                profile: profile,
            });
            return newstate;
        }
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.LOGOUT_SUCCESS: {
           return Object.assign({}, initialState);
        }

        // tslint:disable-next-line:no-switch-case-fall-through
        default: {
            return state;
        }
    }
}

export const isLoggedIn = (state: AuthState) => state.isAuthenticated;
export const isMemberOfClub = (state: AuthState) => state.user.isMemberOfClub;
export const isMemberOfSponsor = (state: AuthState) => state.user.isMemberOfSponsor;
export const username = (state: AuthState) => state.user.username;
export const gwtoken = (state: AuthState) => state.token;
export const backUrl = (state: AuthState) => state.backUrl;
export const getProfile = (state: AuthState) => state.profile;
export const getUser = (state: AuthState) => state.user;
