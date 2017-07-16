import {EffectsTestingModule, EffectsRunner} from '@ngrx/effects/testing';
import {TestBed, inject} from '@angular/core/testing';
import {go} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { loadCredentialsAction, loginAction, removeCredentialsAction, elevateAction, registerClubAction, registerSponsorAction,
         loginSuccessAction, logoutAction, logoutSuccessAction } from './auth.actions';
import { User, Club, Sponsor } from '../model/backend-typings';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { RouterPath } from '../app.routing';
import { username, isMemberOfSponsor } from './auth.reducer';
import { Observable } from 'rxjs/Rx';

describe('The Auth Effect', () => {

  const authServiceStub = <AuthService> {
    register: (registerdata) => Observable.of({}),
    login: (logindata: User) => Observable.of({}),
    logout: () => Observable.of({}),
  };

  beforeEach(() => TestBed.configureTestingModule({
      imports: [
          EffectsTestingModule,
      ],
      providers: [
          AuthEffects,
          LocalStorageService,
          {provide: AuthService, useValue: authServiceStub},

      ],
  }));

  let runner: EffectsRunner;
  let authEffects: AuthEffects;
  let authService: AuthService;
  let localStorage: LocalStorageService;

  beforeEach(inject([
      EffectsRunner,
      AuthEffects,
      AuthService,
      LocalStorageService,
  ], (_runner, _authEffects, _authService, _localStorage) => {
      runner = _runner;
      authEffects = _authEffects;
      authService = _authService;
      localStorage = _localStorage;
  }));

  describe('loadCredentials', () => {
    it('should get creds from localstorage and force automatic login', done => {
      const credentials = <User>{
        username: 'tester',
      };
      const expectedResult = loginAction(true, credentials);
      spyOn(localStorage, 'getObject').and.returnValue(credentials);
      runner.queue(loadCredentialsAction());

      authEffects.loadCredentials.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should get empty creds from localstorage not force automatic login', done => {
      const expectedResult = removeCredentialsAction();
      spyOn(localStorage, 'getObject').and.returnValue({});
      runner.queue(loadCredentialsAction());

      authEffects.loadCredentials.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('elevate', () => {
    it('should trigger go login-action', done => {
      const expectedResult = go([RouterPath.LOGIN]);
      runner.queue(elevateAction('backurl-test'));

      authEffects.elevate.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('registerClub', () => {
    it('should trigger go login-action after successful registration service call', done => {
      const user = <User>{
        username: 'tester',
      };
      const club = <Club>{
        name: 'testclub',
        kind: [],
      };
      const expectedResult = loginAction(undefined, user, 'auth/clubprofile');
      runner.queue(registerClubAction(user, club));
      spyOn(authService, 'register').and.returnValue(Observable.of(expectedResult));

      authEffects.registerClub.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should trigger removeCredentialsAction after unsuccessful registration service call', done => {
      const user = <User>{
        username: 'tester',
      };
      const club = <Club>{
        name: 'testclub',
        kind: [],
      };
      const expectedResult = [removeCredentialsAction(), go([RouterPath.HOME])];
      runner.queue(registerClubAction(user, club));
      spyOn(authService, 'register').and.throwError('testexception');
      let idx = 0;
      authEffects.registerClub.subscribe((result) => {
        expect(result).toEqual(expectedResult[idx++]);
        if (idx >= expectedResult.length) {
          done();
        }
      });
    });
  });

  describe('registerSponsor', () => {
    it('should trigger go login-action after successful registration service call', done => {
      const user = <User>{
        username: 'tester',
      };
      const sponsor = <Sponsor>{
        name: 'testsponsor',
        kind: [],
      };
      const expectedResult = loginAction(undefined, user, 'auth/sponsorprofile');
      runner.queue(registerSponsorAction(user, sponsor));
      spyOn(authService, 'register').and.returnValue(Observable.of(expectedResult));

      authEffects.registerSponsor.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should trigger removeCredentialsAction after unsuccessful registration service call', done => {
      const user = <User>{
        username: 'tester',
      };
      const sponsor = <Sponsor>{
        name: 'testsponsor',
        kind: [],
      };
      const expectedResult = [removeCredentialsAction(), go([RouterPath.HOME])];
      runner.queue(registerSponsorAction(user, sponsor));
      spyOn(authService, 'register').and.throwError('testexception');
      let idx = 0;
      authEffects.registerSponsor.subscribe((result) => {
        expect(result).toEqual(expectedResult[idx++]);
        if (idx >= expectedResult.length) {
          done();
        }
      });
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
      const expectedResult = loginSuccessAction(registereduser, 'backurl-test');
      runner.queue(loginAction(false, user, 'backurl-test'));
      spyOn(authService, 'login').and.returnValue(Observable.of(registereduser));

      authEffects.login.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should trigger loginSuccessAction with rememberMe after successful registration service call', done => {
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
      const expectedResult = loginSuccessAction(registereduser, 'backurl-test');
      runner.queue(loginAction(true, user, 'backurl-test'));
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

      authEffects.login.subscribe((result) => {
        expect(localStorCallsSpy.mostRecent().args).toEqual(localStorageSpyArgs);
        expect(localStorCallsSpy.count()).toEqual(1);
        expect(result).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('removeCredentials', () => {
    it('should trigger removeCredentialsAction and remove creds in localstorage', done => {
      const localStorageSpy = spyOn(localStorage, 'storeObject');
      const localStorageSpyArgs = [
        'GCToken',
        {},
      ];
      runner.queue(removeCredentialsAction());
      const localStorCallsSpy = localStorageSpy.calls;
      authEffects.removeCredentials.subscribe((result) => {
        expect(localStorCallsSpy.mostRecent().args).toEqual(localStorageSpyArgs);
        expect(localStorCallsSpy.count()).toEqual(1);
        done();
      });
    });
  });

  describe('loginSuccess', () => {
    it('should trigger go home action on login-success', done => {
      const backurl = 'test-backurl';
      const expectedAction = go([backurl]);
      const loggedinUser = <User>{
        username: 'tester',
        token: '4711',
        isMemberOfClub: 'clubid',
        isMemberOfSponsor: undefined,
      };

      runner.queue(loginSuccessAction(loggedinUser, backurl));

      authEffects.loginSuccess.subscribe((result) => {
        expect(result).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('logout', () => {
    it('should logout on service', done => {

      const expectedResult = logoutSuccessAction();
      runner.queue(logoutAction());

      authEffects.logout.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('should trigger logout Success even on service.logout()-exceptions', done => {

      const expectedResult = logoutSuccessAction();
      runner.queue(logoutAction());
      spyOn(authService, 'logout').and.throwError('test-exception');
      authEffects.logout.subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('logoutSuccess', () => {
    it('should remove creds on logoutSuccessAction', done => {
      runner.queue(logoutSuccessAction());
      const expectedResult = [removeCredentialsAction(), go([RouterPath.HOME])];
      let idx = 0;
      authEffects.logoutSuccess.subscribe((result) => {
        expect(result).toEqual(expectedResult[idx++]);
        if (idx >= expectedResult.length) {
          done();
        }
      });
    });
  });
});
