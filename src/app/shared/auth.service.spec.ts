/* tslint:disable:no-unused-variable */

import { AuthService } from './auth.service';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';

describe('AuthService', () => {
  const crudStub: CrudService = <CrudService>{
    unsave: () => crudStub,
    authenticated: (token: string) => false,
    post: (url: string, loginData) => {},
    get: (url: string) => Observable.of({}),
  };


  const service = new AuthService(crudStub);

  it('should register new user...', () => {
    const spy = spyOn(crudStub, 'post');
    service.register({name: 'Hans'});
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should login a user...', () => {
    const spy = spyOn(crudStub, 'post');
    service.register({password: 'Hans'});
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should logout a user...', () => {
    expect(service.logout()).toEqual(Observable.of(true));
  });
});
