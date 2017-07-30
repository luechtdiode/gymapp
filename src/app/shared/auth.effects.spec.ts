import {TestBed, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import {EffectsModule} from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { LoadCredentialsAction, LoginAction, RemoveCredentialsAction, ElevateAction, RegisterClubAction, RegisterSponsorAction,
         LoginSuccessAction, LogoutAction, LogoutSuccessAction } from './auth.actions';
import { User, Club, Sponsor } from '../model/backend-typings';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { RouterPath, appRoutes } from '../app.routing';
import { username, isMemberOfSponsor } from './auth.reducer';
import { Observable } from 'rxjs/Rx';
import { Router, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app-state.reducer';

xdescribe('The Auth Effect', () => {
  let actions: Observable<any>;
  const authServiceStub = <AuthService> {
    register: (registerdata) => Observable.of({}),
    login: (logindata: User) => Observable.of({}),
    logout: () => Observable.of({}),
  };
  const routerStub = {
    navigate: () => {},
  };

  let authEffects: AuthEffects;
  let authService: AuthService;
  let localStorage: LocalStorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
          LocalStorageService,
          {provide: AuthService, useValue: authServiceStub},
          {provide: Router, useValue: routerStub},
          provideMockActions(() => {
            console.log(actions);
            return actions}),
          AuthEffects,
      ],
    });
    authService = TestBed.get(AuthService);
    localStorage = TestBed.get(LocalStorageService);
    router = TestBed.get(Router);
    authEffects = TestBed.get(AuthEffects);
  });

  it('should smoketest', () => {
      actions = hot('--a-', {a: new LoadCredentialsAction()});
      const expected = cold('--b', { b: new LoginAction(true, {}) });
      // expect(authEffects.logActions).toBeObservable(expected);
  });

  describe('loadCredentials', () => {
    it('should get creds from localstorage and force automatic login', () => {
      const credentials = <User>{
        username: 'tester',
      };
      spyOn(localStorage, 'getObject').and.returnValue(credentials);
      actions = hot('--a-', {a: new LoadCredentialsAction()});
      const expected = cold('--b', { b: new LoginAction(true, credentials) });
      expect(authEffects.loadCredentials).toBeObservable(expected);
    });

    it('should get empty creds from localstorage not force automatic login', () => {
      spyOn(localStorage, 'getObject').and.returnValue({});
      actions = hot('--a-', {a: new LoadCredentialsAction()});
      const expected = cold('--b', { b: new RemoveCredentialsAction() });
      expect(authEffects.loadCredentials).toBeObservable(expected);
    });
  });

  describe('elevate', () => {
    it('should trigger go login-action', () => {
      spyOn(router, 'navigate');
      actions = hot('--a-', {a: new ElevateAction('backurl-test')});
      const expected = cold('--b', { b: new Promise(() => true) });
      expect(authEffects.elevate).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalled();
      // const expectedResult = go([RouterPath.LOGIN]);
    });
  });

  describe('registerClub', () => {
    it('should trigger go login-action after successful registration service call', () => {
      const user = <User>{
        username: 'tester',
      };
      const club = <Club>{
        name: 'testclub',
        kind: [],
      };

      actions = hot('--a-', {a: new RegisterClubAction(user, club)});
      const expected = cold('--b', { b: new LoginAction(undefined, user, 'auth/clubprofile') });
      expect(authEffects.registerClub).toBeObservable(expected);
    });

    it('should trigger removeCredentialsAction after unsuccessful registration service call', done => {
      const user = <User>{
        username: 'tester',
      };
      const club = <Club>{
        name: 'testclub',
        kind: [],
      };
      spyOn(authService, 'register').and.throwError('testexception');
      spyOn(router, 'navigate');
      actions = hot('--a-', {a: new RegisterClubAction(user, club)});
      const expected = cold('--b', { b: new RemoveCredentialsAction() });
      expect(authEffects.registerClub).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalled();

    });
  });

  describe('registerSponsor', () => {
    it('should trigger go login-action after successful registration service call', () => {
      const user = <User>{
        username: 'tester',
      };
      const sponsor = <Sponsor>{
        name: 'testsponsor',
        kind: [],
      };
      const expectedResult = new LoginAction(undefined, user, 'auth/sponsorprofile');
      spyOn(authService, 'register').and.returnValue(Observable.of(expectedResult));
      actions = hot('--a-', {a: new RegisterSponsorAction(user, sponsor)});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.registerSponsor).toBeObservable(expected);
    });

    it('should trigger removeCredentialsAction after unsuccessful registration service call', done => {
      const user = <User>{
        username: 'tester',
      };
      const sponsor = <Sponsor>{
        name: 'testsponsor',
        kind: [],
      };

      spyOn(router, 'navigate');
      spyOn(authService, 'register').and.throwError('testexception');
      actions = hot('--a-', {a: new RegisterSponsorAction(user, sponsor)});
      const expected = cold('--b', { b: new RemoveCredentialsAction() });
      expect(authEffects.registerSponsor).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should trigger loginSuccessAction after successful registration service call', done => {
      const user = <User>{
        username: 'tester',
        token: '4711',
      };
      const registereduser = <User>{
        username: 'tester',
        token: '4711',
        isMemberOfClub: 'clubid',
        isMemberOfSponsor: undefined,
      };
      const expectedResult = new LoginSuccessAction(registereduser, 'backurl-test');

      actions = hot('--a-', {a: new LoginAction(false, user, 'backurl-test')});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
    });

    it('should trigger loginSuccessAction with rememberMe after successful registration service call', () => {
      const user = <User>{
        username: 'tester',
        token: '4711',
      };
      const registereduser = <User>{
        username: 'tester',
        token: '4711',
        isMemberOfClub: 'clubid',
        isMemberOfSponsor: undefined,
      };
      const expectedResult = new LoginSuccessAction(registereduser, 'backurl-test');
      const localStorageSpy = spyOn(localStorage, 'storeObject');
      const localStorageSpyArgs = [
        'GCToken',
        {
          username: registereduser.username,
          token: registereduser.token,
          isMemberOfClub: registereduser.isMemberOfClub,
          isMemberOfSponsor: registereduser.isMemberOfSponsor,
        },
      ];
      const localStorCallsSpy = localStorageSpy.calls;
      spyOn(authService, 'login').and.returnValue(Observable.of(registereduser));

      actions = hot('--a-', {a: new LoginAction(true, user, 'backurl-test')});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
      expect(localStorCallsSpy.mostRecent().args).toEqual(localStorageSpyArgs);
      expect(localStorCallsSpy.count()).toEqual(1);
    });
  });

  describe('removeCredentials', () => {
    it('should trigger removeCredentialsAction and remove creds in localstorage', () => {
      const localStorageSpy = spyOn(localStorage, 'storeObject');
      const localStorageSpyArgs = [
        'GCToken',
        {},
      ];
      actions = hot('--a-', {a: new RemoveCredentialsAction()});
      // const expected = cold('--b', { b: expectedResult });
      expect(authEffects.removeCredentials).toBeUndefined();
      const localStorCallsSpy = localStorageSpy.calls;
      expect(localStorCallsSpy.mostRecent().args).toEqual(localStorageSpyArgs);
      expect(localStorCallsSpy.count()).toEqual(1);
    });
  });

  describe('loginSuccess', () => {
    it('should trigger go home action on login-success', () => {
      const backurl = 'test-backurl';
      const loggedinUser = <User>{
        username: 'tester',
        token: '4711',
        isMemberOfClub: 'clubid',
        isMemberOfSponsor: undefined,
      };

      spyOn(router, 'navigate');
      actions = hot('--a-', {a: new LoginSuccessAction(loggedinUser, backurl)});
      // const expected = cold('--b', { b: new RemoveCredentialsAction() });
      // expect(authEffects.registerClub).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should logout on service', () => {
      const expectedResult = new LogoutSuccessAction();
      actions = hot('--a-', {a: new LogoutAction()});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
    });

    it('should trigger logout Success even on service.logout()-exceptions', done => {

      const expectedResult = new LogoutSuccessAction();
      spyOn(authService, 'logout').and.throwError('test-exception');
      actions = hot('--a-', {a: new LogoutAction()});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
    });
  });

  describe('logoutSuccess', () => {
    it('should remove creds on logoutSuccessAction', () => {
      spyOn(router, 'navigate');
      actions = hot('--a-', {a: new LogoutSuccessAction()});
      const expected = cold('--b', { b: new RemoveCredentialsAction() });
      expect(authEffects.logoutSuccess).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalled();

    });
  });
});
