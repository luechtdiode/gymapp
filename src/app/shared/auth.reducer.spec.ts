/*
 * Testing a TypeScript class
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#testing-without-atp
 */
import * as auth from './auth.reducer'
import { AuthState, username } from './auth.reducer';
import { LoginSuccessAction, RemoveCredentialsAction, ElevateAction, LoginAction, LogoutSuccessAction } from './auth.actions';
import { User } from '../model/backend-typings';

describe('Auth reducer', () => {
    let user: User;

    beforeEach(() => {
        // write your set up here
        user = <User>{
          username: 'tester',
          token: '4711',
          success: true,
        }
    });

    it('should remove credentials', () => {
      const prestate = auth.reducer(undefined, new LoginSuccessAction(user))
      const authstate = auth.reducer(prestate, new RemoveCredentialsAction());
      expect(authstate.user.username).toBeUndefined();
    });

    it('should elevate', () => {
      const state = auth.reducer(undefined, new ElevateAction('/clubs'))
      expect(state.backUrl).toEqual('/clubs');
    });

    it('should store login success', () => {
      const state = auth.reducer(undefined, new LoginSuccessAction(user, '/clubs'));
      expect(state.user.username).toEqual('tester');
      expect(state.isAuthenticated).toBeTruthy();
    });

    it('should logout', () => {
      const state = auth.reducer(undefined, new LoginSuccessAction(user, '/clubs'));
      const loggedOutState = auth.reducer(state, new LogoutSuccessAction());
      expect(loggedOutState.user.username).toBeUndefined();
      expect(loggedOutState.isAuthenticated).toBeFalsy();
    });
});
