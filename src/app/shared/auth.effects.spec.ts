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
import { appRoutes } from '../app.routing';
import { username, isMemberOfSponsor } from './auth.reducer';
import { Observable } from 'rxjs/Rx';
import { Router, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app-state.reducer';

describe('The Auth Effect', () => {
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
          provideMockActions(() => {return actions}),
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
  });

  describe('loadCredentials', () => {
    it('should get creds from localstorage and force automatic login', () => {
      const credentials = <User>{
        username: 'tester',
      };
      spyOn(localStorage, 'getObject').and.returnValue(credentials);
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(new LoadCredentialsAction());
      // actions = hot('--a-', {a: new LoadCredentialsAction()});
      // const expected = cold('--b-', { b: new LoginAction(true, credentials) });
      // expect(authEffects.loadCredentials).toBeObservable(expected);
      authEffects.loadCredentials.subscribe(action => {
        expect(action).toEqual(new LoginAction(true, credentials));
      });
    });

    it('should get empty creds from localstorage not force automatic login', () => {
      spyOn(localStorage, 'getObject').and.returnValue({});
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(new LoadCredentialsAction());
      // actions = hot('--a-', {a: new LoadCredentialsAction()});
      // const expected = cold('--b', { b: new RemoveCredentialsAction() });
      // expect(authEffects.loadCredentials).toBeObservable(expected);
      authEffects.loadCredentials.subscribe(action => {
        expect(action).toEqual(new RemoveCredentialsAction());
      });
    });
  });

  describe('elevate', () => {
    it('should trigger go login-action', () => {
      spyOn(router, 'navigate');
      const triggeraction = new ElevateAction('backurl-test');
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      // actions = hot('--a-', {a: new ElevateAction('backurl-test')});
      // const expected = cold('--b', { b: new Promise(() => true) });
      // expect(authEffects.elevate).toBeObservable(expected);
      authEffects.elevate.subscribe(action => {
        expect(action).toEqual(triggeraction);
      });
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('registerClub', () => {
    it('should trigger go loginsuccess-action after successful registration service call', () => {
      const user = <User>{
        username: 'tester',
      };
      const club = <Club>{
        name: 'testclub',
        kind: [],
      };
      /*
      actions = hot('--a-', {a: new RegisterClubAction(user, club)});
      const expected = cold('--b', { b: new LoginAction(undefined, user, 'auth/clubprofile') });
      expect(authEffects.registerClub).toBeObservable(expected);
      */
      const authReplay = Observable.of(user);
      spyOn(authService, 'register').and.returnValue(authReplay);
      const triggeraction = new RegisterClubAction(user, club);
      const expectedaction = new LoginSuccessAction(user, 'auth/clubprofile');
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.registerClub.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });
    });

    it('should trigger removeCredentialsAction after unsuccessful registration service call', () => {
      const user = <User>{
        username: 'tester',
      };
      const club = <Club>{
        name: 'testclub',
        kind: [],
      };
      const authReplay = new ReplaySubject(1);
      authReplay.error(new Error('testexception'));
      spyOn(authService, 'register').and.returnValue(authReplay);
      spyOn(router, 'navigate');
      /*
      actions = hot('--a-', {a: new RegisterClubAction(user, club)});
      const expected = cold('--b', { b: new RemoveCredentialsAction() });
      expect(authEffects.registerClub).toBeObservable(expected);
      */
      const triggeraction = new RegisterClubAction(user, club);
      const expectedaction = new RemoveCredentialsAction();
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.registerClub.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });

      expect(router.navigate).toHaveBeenCalled();

    });
  });

  describe('registerSponsor', () => {
    it('should trigger go loginsuccess-action after successful registration service call', () => {
      const user = <User>{
        username: 'tester',
      };
      const sponsor = <Sponsor>{
        name: 'testsponsor',
        kind: [],
      };
      const expectedResult = new LoginSuccessAction(user, 'auth/sponsorprofile');
      spyOn(authService, 'register').and.returnValue(Observable.of(expectedResult));
      /*
      actions = hot('--a-', {a: new RegisterSponsorAction(user, sponsor)});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.registerSponsor).toBeObservable(expected);
      */
      const triggeraction = new RegisterSponsorAction(user, sponsor);

      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.registerClub.subscribe(action => {
        expect(action).toEqual(expectedResult);
      });
    });

    it('should trigger removeCredentialsAction after unsuccessful registration service call', () => {
      const user = <User>{
        username: 'tester',
      };
      const sponsor = <Sponsor>{
        name: 'testsponsor',
        kind: [],
      };

      spyOn(router, 'navigate');
      const authReplay = new ReplaySubject(1);
      authReplay.error(new Error('testexception'));
      spyOn(authService, 'register').and.returnValue(authReplay);
      /*
      actions = hot('--a-', {a: new RegisterSponsorAction(user, sponsor)});
      const expected = cold('--b', { b: new RemoveCredentialsAction() });
      expect(authEffects.registerSponsor).toBeObservable(expected);
      */
      const triggeraction = new RegisterSponsorAction(user, sponsor);
      const expectedaction = new RemoveCredentialsAction();
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.registerSponsor.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should trigger loginSuccessAction after successful registration service call', () => {
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
      spyOn(authService, 'login').and.returnValue(Observable.of(registereduser));
      /*
      actions = hot('--a-', {a: new LoginAction(false, user, 'backurl-test')});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
      */
      const triggeraction = new LoginAction(false, user, 'backurl-test');
      const expectedaction = new LoginSuccessAction(registereduser, 'backurl-test');
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.login.subscribe(action => {
        console.log(action);
        expect(action).toEqual(expectedaction);
      });
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

      /*
      actions = hot('--a-', {a: new LoginAction(true, user, 'backurl-test')});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
      */
      const triggeraction = new LoginAction(true, user, 'backurl-test');
      const expectedaction = expectedResult;
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.login.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });

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
      /*
      actions = hot('--a-', {a: new RemoveCredentialsAction()});
      // const expected = cold('--b', { b: expectedResult });
      expect(authEffects.removeCredentials).toBeUndefined();
      */
      const triggeraction = new RemoveCredentialsAction();
      const expectedaction = triggeraction;
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.removeCredentials.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });
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
      // actions = hot('--a-', {a: new LoginSuccessAction(loggedinUser, backurl)});
      // const expected = cold('--b', { b: new RemoveCredentialsAction() });
      // expect(authEffects.loginSuccess).toBeObservable(expected);
      const triggeraction = new LoginSuccessAction(loggedinUser, backurl);
      const expectedaction = triggeraction;
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.loginSuccess.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should logout on service', () => {
      const expectedResult = new LogoutSuccessAction();
      /*
      actions = hot('--a-', {a: new LogoutAction()});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
      */
      const triggeraction = new LogoutAction();
      const expectedaction = expectedResult;
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.loginSuccess.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });
    });

    it('should trigger logout Success even on service.logout()-exceptions', () => {

      const expectedResult = new LogoutSuccessAction();
      spyOn(authService, 'logout').and.throwError('test-exception');
      /*
      actions = hot('--a-', {a: new LogoutAction()});
      const expected = cold('--b', { b: expectedResult });
      expect(authEffects.login).toBeObservable(expected);
      */
      const triggeraction = new LogoutAction();
      const expectedaction = expectedResult;
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.loginSuccess.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });
    });
  });

  describe('logoutSuccess', () => {
    it('should remove creds on logoutSuccessAction', () => {
      spyOn(router, 'navigate');
      /*
      actions = hot('--a-', {a: new LogoutSuccessAction()});
      const expected = cold('--b', { b: new RemoveCredentialsAction() });
      expect(authEffects.logoutSuccess).toBeObservable(expected);
      */
      const triggeraction = new LogoutSuccessAction();
      const expectedaction = new RemoveCredentialsAction();
      actions = new ReplaySubject(1);
      (actions as ReplaySubject<any>).next(triggeraction);
      authEffects.logoutSuccess.subscribe(action => {
        expect(action).toEqual(expectedaction);
      });
      expect(router.navigate).toHaveBeenCalled();

    });
  });
});
