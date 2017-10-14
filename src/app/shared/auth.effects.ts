import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { User } from '../model/backend-typings';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { isMemberOfClub, isMemberOfSponsor, Profile } from './auth.reducer';
import { RouterPath } from '../router-path';
import * as authActions from './auth.actions';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

const TOKEN_KEY = 'GCToken';
const AUTHPROVIDER_KEY = 'AUTHPROVIDER';

@Injectable()
export class AuthEffects {
/*
   @Effect({ dispatch: false }) logActions = this.actions$
   .ofType(authActions.LOGIN)
    .do(action => {
      console.log(action);
    });
    // constructor(private actions$: Actions) {}
    @Effect()
    init$: Observable<Action> = defer(() => {
//      return of(new authActions.LoadCredentialsAction());
        console.log('loading creds ...');
        const credentials = this.localStorage.getObject(TOKEN_KEY, {}) as User;
        if (credentials && credentials.username) {
            return of(new authActions.LoginAction(true, credentials));
        } else {
            return of(new authActions.RemoveCredentialsAction());
        };
    }); */

    @Effect({ dispatch: false })
    elevate = this.actions$
        .ofType(authActions.ELEVATE)
        .do((action) => this.router.navigate([RouterPath.LOGIN]));

    @Effect()
    registerClub = this.actions$
        .ofType(authActions.REGISTER_CLUB)
        .switchMap((action: authActions.RegisterClubAction) => this.authService.register(Object.assign(
            {     username : '',
                  password : '',
                  email: '',
                  firstname : '',
                  lastname : '',
                  homepage: '',
                  image: action.payload.club.image,
                  googleplushandle: '',
                  facebookhandle: '',
                  twitterhandle: '',
                  youtubehandle: '',
                  name : '',
                  label : '',
                  kind : '',
                }, action.payload.user, action.payload.club))
            .map((response) => {
                console.log('register success: ', response);
                return new authActions.LoginSuccessAction(response, RouterPath.CLUBPROFILE);
            })
        // TODO integrate toastr component
            .catch(() => {
                this.router.navigate([RouterPath.HOME]);
                return Observable.of(new authActions.RemoveCredentialsAction());
        }));

    @Effect()
    registerSponsor = this.actions$
        .ofType(authActions.REGISTER_SPONSOR)
        .switchMap((action: authActions.RegisterSponsorAction) => this.authService.register(Object.assign(
            {     username : '',
                  password : '',
                  email: '',
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
                  regactions : action.payload.sponsor.sponsoractions ? action.payload.sponsor.sponsoractions.map(ra =>
                    Object.assign({}, ra, {selected: true, kinds: ra.kinds ? ra.kinds.join(',') : []})) : [],
                }, action.payload.user))
            .map((response) => {
                // console.log('register success: ' + response);
                return Observable.of(new authActions.LoginSuccessAction(response, RouterPath.SPONSORPROFILE));
            })
        // TODO integrate toastr component
            .catch((e) => {
                this.router.navigate([RouterPath.HOME]);
                return Observable.of(new authActions.RemoveCredentialsAction());
            }));

    @Effect()
    login = this.actions$
        .ofType(authActions.LOGIN)
        .switchMap((action: authActions.LoginAction) => this.authService.login(action.payload.user)
            .map((credentialsAccepted: User) => {
                console.log('login success');
                if (action.payload.rememberMe) {
                    this.localStorage.storeObject(TOKEN_KEY, credentialsAccepted);
                }
                return new authActions.LoginSuccessAction( credentialsAccepted, action.payload.backUrl);
            })
            .catch(() => {
                this.router.navigate([RouterPath.HOME]);
                return Observable.of(new authActions.RemoveCredentialsAction());
            }),
        // TODO integrate toastr component
        );

    @Effect({ dispatch: false })
    removeCredentials = this.actions$
        .ofType(authActions.REMOVE_CREDENTIALS)
        .do(() => this.localStorage.storeObject(TOKEN_KEY, {}));

    @Effect()
    loadCredentials = this.actions$
        .ofType(authActions.LOAD_CREDENTIALS)
        .startWith(new authActions.LoadCredentialsAction())
        .switchMap((action) => {
            const credentials = this.localStorage.getObject(TOKEN_KEY, {}) as User;
            if (credentials && credentials.username) {
                return Observable.of(new authActions.LoginAction(true, credentials));
            } else {
                return Observable.of(new authActions.RemoveCredentialsAction());
            };
        });

    @Effect({ dispatch: false })
    loginSuccess = this.actions$
        .ofType(authActions.LOGIN_SUCCESS)
        .filter((action: authActions.LoginSuccessAction) => action.payload.backUrl)
        .do((action: authActions.LoginSuccessAction) => this.router.navigate([action.payload.backUrl]));

    @Effect()
    logoutSuccess = this.actions$
        .ofType(authActions.LOGOUT_SUCCESS)
        .map(() => {
            this.router.navigate([RouterPath.HOME]);
            return new authActions.RemoveCredentialsAction();
        });

    @Effect()
    logout = this.actions$
        .ofType(authActions.LOGOUT)
        .switchMap(() => this.authService.logout()
            .map(logoutCompleted => new authActions.LogoutSuccessAction()))
        .catch(() => Observable.of(new authActions.LogoutSuccessAction()));

    @Effect()
    profile = this.actions$
    .ofType(authActions.PROFILE)
    .filter((action) => (action as authActions.ProfileAction).payload === undefined)
    .switchMap((action: authActions.ProfileAction) => this.authService.profile()
        .map((profiledata: any) =>
            new authActions.ProfileSuccessAction(profiledata))
        .catch((e) => {
        // this.router.navigate([RouterPath.HOME]);
        return Observable.of({type: ''});
    }));

    @Effect()
    saveProfile = this.actions$
    .ofType(authActions.SAVE_PROFILE)
    .switchMap((action: authActions.SaveProfileAction) => this.authService.saveProfile(action.payload)
        .map((profiledata: Profile) => new authActions.ProfileSuccessAction(profiledata))
        .catch((e) =>
            // this.router.navigate([RouterPath.HOME]);
            Observable.of(new  authActions.ProfileAction())));

    @Effect({ dispatch: false })
    connectToFacebook = this.actions$
        .ofType(authActions.CONNECT_TO_SOCIALPROVIDER)
        .do((action: authActions.ConnectToSocialProviderAction) =>
            this.authService.connectWithSocialProvider(action.payload));

    @Effect()
    disconnectFromSocialProvider = this.actions$
        .ofType(authActions.DISCONNECT_FROM_SOCIALPROVIDER)
        .do((action: authActions.DisconnectFromSocialProviderAction) =>
            this.localStorage.storeObject(AUTHPROVIDER_KEY, {}))
        .switchMap((action: authActions.DisconnectFromSocialProviderAction) =>
            this.authService.disconnectFromSocialProvider(action.payload.user.id, action.payload.provider)
            .map((credentialsAccepted: User) => new authActions.LoginSuccessAction( credentialsAccepted, action.payload.backUrl))
            .catch(() => {
                // this.router.navigate([RouterPath.HOME]);
                return Observable.of({type: ''});
            }),
        // TODO integrate toastr component
        );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private localStorage: LocalStorageService,
        private router: Router) {
    }
}
