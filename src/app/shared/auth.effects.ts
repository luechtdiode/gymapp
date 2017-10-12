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
import { isMemberOfClub, isMemberOfSponsor } from './auth.reducer';
import { RouterPath } from '../router-path';
import * as authActions from './auth.actions';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { DisconnectToFacebookAction, ProfileSuccessAction } from './auth.actions';

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
        .mergeMap((action: authActions.RegisterClubAction) => this.authService.register(Object.assign(
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
                // console.log('register success: ' + response);
                return new authActions.LoginAction(action.payload.rememberMe, action.payload.user, RouterPath.CLUBPROFILE);
            }),
        // TODO integrate toastr component
        ).catch(() => {
            this.router.navigate([RouterPath.HOME]);
            return [new authActions.RemoveCredentialsAction()];
        });

    @Effect()
    registerSponsor = this.actions$
        .ofType(authActions.REGISTER_SPONSOR)
        .mergeMap((action: authActions.RegisterSponsorAction) => this.authService.register(Object.assign(
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
                return new authActions.LoginAction(action.payload.rememberMe, action.payload.user, RouterPath.SPONSORPROFILE);
            }),
        // TODO integrate toastr component
        ).catch((e) => {
            this.router.navigate([RouterPath.HOME]);
            return [new authActions.RemoveCredentialsAction()];
        });

    @Effect()
    login = this.actions$
        .ofType(authActions.LOGIN)
        .mergeMap((action: authActions.LoginAction) => this.authService.login(action.payload.user)
            .map((credentialsAccepted: User) => {
                console.log('login success');
                if (action.payload.rememberMe) {
                    this.localStorage.storeObject(TOKEN_KEY, credentialsAccepted);
                    // this.localStorage.storeObject(TOKEN_KEY, {
                    //     username: credentialsAccepted.username,
                    //     token: credentialsAccepted.token,
                    //     isMemberOfClub: credentialsAccepted.isMemberOfClub,
                    //     isMemberOfSponsor: credentialsAccepted.isMemberOfSponsor,
                    // });
                }
                return new authActions.LoginSuccessAction( credentialsAccepted, action.payload.backUrl);
            })
            .catch(() => {
                this.router.navigate([RouterPath.HOME]);
                return [new authActions.RemoveCredentialsAction()];
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
        .mergeMap((action) => {
            const credentials = this.localStorage.getObject(TOKEN_KEY, {}) as User;
            if (credentials && credentials.username) {
                return [new authActions.LoginAction(true, credentials)];
            } else {
                return [new authActions.RemoveCredentialsAction()];
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
        .map(() => this.authService.logout())
        .map(logoutCompleted => new authActions.LogoutSuccessAction())
        .catch(() => Observable.of(new authActions.LogoutSuccessAction()));

    @Effect()
    profile = this.actions$
    .ofType(authActions.PROFILE)
    .filter((action) => (action as authActions.ProfileAction).payload === undefined)
    .mergeMap((action: authActions.ProfileAction) => this.authService.profile()
        .map((profiledata: any) =>
            new authActions.ProfileSuccessAction(profiledata.token, profiledata.user, profiledata.sponsor, profiledata.club))
        // TODO integrate toastr component
    ).catch((e) => {
        this.router.navigate([RouterPath.HOME]);
        return [new authActions.RemoveCredentialsAction()];
    });

    @Effect({ dispatch: false })
    connectToFacebook = this.actions$
        .ofType(authActions.CONNECT_TO_FACEBOOK)
        .do(() => this.authService.connectWithFacebook());
        // .do((credentialsAccepted: User) => {
        //     console.log('connect to facebook login success');
        //     this.localStorage.storeObject(AUTHPROVIDER_KEY, 'fb');
        //     return new authActions.LoginSuccessAction( credentialsAccepted, undefined);
        // });

    @Effect({dispatch: false})
    disconnectToFacebook = this.actions$
        .ofType(authActions.DISCONNECT_TO_FACEBOOK)
        .do((action: DisconnectToFacebookAction) => this.localStorage.storeObject(AUTHPROVIDER_KEY, {}));

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private localStorage: LocalStorageService,
        private router: Router) {
    }
}
