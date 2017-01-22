import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Competition, User } from '../model/backend-typings';
import * as auth from './auth.actions';

export interface AuthState {
    backUrl: string;
    user?: User;
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    backUrl: undefined,
    user: {
        username: undefined,
        token: undefined,
        isMemberOfSponsor: undefined,
        isMemberOfClub: undefined,
    },
    isAuthenticated: false,
};

export function reducer(state = initialState, action: Action): AuthState {
    switch (action.type) {
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.ActionTypes.REMOVE_CREDENTIALS: {
            return Object.assign({}, initialState);
        }
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.ActionTypes.ELEVATE: {
            /*const backurl = action.payload;
            console.log('start login from: ', backurl );
            return Object.assign({}, state, {
                backUrl: backurl,
            });*/
            console.log('session timed out');
            return Object.assign({}, initialState);
        }
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.ActionTypes.LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                user: action.payload.user,
                isAuthenticated: action.payload.user.success
            });
        }
        // tslint:disable-next-line:no-switch-case-fall-through
        case auth.ActionTypes.LOGOUT_SUCCESS: {
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
export const gwtoken = (state: AuthState) => state.user.token;
export const backUrl = (state: AuthState) => state.backUrl;
