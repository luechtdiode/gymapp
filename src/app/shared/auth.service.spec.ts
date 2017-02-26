/* tslint:disable:no-unused-variable */

import { AuthService } from './auth.service';
import { CrudService } from './crud.service';

describe('AuthService', () => {
  const crudStub: CrudService = <CrudService>{
    unsave: () => crudStub,
    authenticated: () => false,
    post: (url: string, loginData) => {}
  };

  let service = new AuthService(crudStub);

  it('should register new user...', () => {
    expect(service).toBeTruthy();
    let spy = spyOn(crudStub, 'post');
    service.register({name: "Hans"});
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should login a user...', () => {
    expect(service).toBeTruthy();
    let spy = spyOn(crudStub, 'post');
    service.register({password: "Hans"});
    expect(spy.calls.any()).toBeTruthy();
  });
});
