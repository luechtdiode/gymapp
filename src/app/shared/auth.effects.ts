import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { User } from '../model/backend-typings';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { isMemberOfClub, isMemberOfSponsor } from './auth.reducer';
import { RouterPath } from '../app.routing';
import {
    ActionTypes, loadCredentialsAction, loginAction,
    removeCredentialsAction, loginSuccessAction, logoutSuccessAction,
} from './auth.actions';

const TOKEN_KEY = 'GCToken';

@Injectable()
export class AuthEffects {

    @Effect()
    loadCredentials = this.actions$
        .ofType(ActionTypes.LOAD_CREDENTIALS)
        .startWith(loadCredentialsAction())
        .map(() => this.localStorage.getObject(TOKEN_KEY, {}))
        .map((credentials: User) => {
            if (credentials && credentials.username) {
                return loginAction(true, credentials);
            } else {
                return removeCredentialsAction();
            };
        });

    @Effect()
    elevate = this.actions$
        .ofType(ActionTypes.ELEVATE)
        .map((action) => go([RouterPath.LOGIN]));

    @Effect()
    registerClub = this.actions$
        .ofType(ActionTypes.REGISTER_CLUB)
        .mergeMap((action) => this.authService.register(Object.assign(
            {     username : '',
                  password : '',
                  firstname : '',
                  lastname : '',
                  homepage: '',
                  image: '',
                  googleplushandle: '',
                  facebookhandle: '',
                  twitterhandle: '',
                  youtubehandle: '',
                  name : '',
                  label : '',
                  kind : '',
                }, action.payload.user, action.payload.club))
            .map((response) => {
                console.log('register success: ' + response);
                return loginAction(action.payload.rememberMe, action.payload.user, RouterPath.CLUBPROFILE);
            }),
        // TODO integrate toastr component
        ).catch(() => [removeCredentialsAction(), go([RouterPath.HOME])]);

    @Effect()
    registerSponsor = this.actions$
        .ofType(ActionTypes.REGISTER_SPONSOR)
        .mergeMap((action) => this.authService.register(Object.assign(
            {     username : '',
                  password : '',
                  firstname : '',
                  lastname : '',
                  homepage: action.payload.sponsor.homepage,
                  image: action.payload.sponsor.image,
                  googleplushandle: action.payload.sponsor.googleplushandle,
                  facebookhandle: action.payload.sponsor.facebookhandle,
                  twitterhandle: action.payload.sponsortwitterhandle,
                  youtubehandle: action.payload.sponsor.youtubehandle,
                  company : action.payload.sponsor.name,
                  slogan : action.payload.sponsor.slogan,
                  budget : action.payload.sponsor.budget,
                  regactions : action.payload.sponsor.sponsoractions.map(ra =>
                    Object.assign({}, ra, {selected: true, kinds: ra.kinds.join(',')})),
                }, action.payload.user))
            .map((response) => {
                console.log('register success: ' + response);
                return loginAction(action.payload.rememberMe, action.payload.user, RouterPath.SPONSORPROFILE);
            }),
        // TODO integrate toastr component
        ).catch(() => [removeCredentialsAction(), go([RouterPath.HOME])]);

    @Effect()
    login = this.actions$
        .ofType(ActionTypes.LOGIN)
        .mergeMap((action) => this.authService.login(action.payload.user)
            .map((credentialsAccepted) => {
                console.log('login success');
                if (action.payload.rememberMe) {
                    this.localStorage.storeObject(TOKEN_KEY, {
                        username: credentialsAccepted.username,
                        token: credentialsAccepted.token,
                        isMemberOfClub: credentialsAccepted.isMemberOfClub,
                        isMemberOfSponsor: credentialsAccepted.isMemberOfSponsor,
                    });
                }
                return loginSuccessAction( credentialsAccepted, action.payload.backUrl);
            })
            .catch(() => [removeCredentialsAction(), go([RouterPath.HOME])]),
        // TODO integrate toastr component
        );

    @Effect({ dispatch: false })
    removeCredentials = this.actions$
        .ofType(ActionTypes.REMOVE_CREDENTIALS)
        .map(() => this.localStorage.storeObject(TOKEN_KEY, {}));

    @Effect()
    loginSuccess = this.actions$
        .ofType(ActionTypes.LOGIN_SUCCESS)
        .filter((action) => action.payload.backUrl)
        .map((action) => go([action.payload.backUrl]));

    @Effect()
    logout = this.actions$
        .ofType(ActionTypes.LOGOUT)
        .map(() => this.authService.logout())
        .map(logoutCompleted => logoutSuccessAction())
        .catch(() => Observable.of(logoutSuccessAction()));

    @Effect()
    logoutSuccess = this.actions$
        .ofType(ActionTypes.LOGOUT_SUCCESS/*, ActionTypes.LOGIN_SUCCESS*/)
        .flatMap(() => [removeCredentialsAction(), go([RouterPath.HOME])]);

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private localStorage: LocalStorageService) {
    }
}
