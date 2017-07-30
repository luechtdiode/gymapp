import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CrudService } from './crud.service';


@Injectable()
export class AuthService {

  private remote: CrudService;

  constructor(private crud: CrudService) {
    this.remote = crud.unsave();
  }

  login(loginData): Observable<any> {
    if (!(loginData.password) && (loginData.token) && this.crud.authenticated(loginData.token)) {
      return Observable.of(Object.assign({}, loginData, {success: true}));
    }

    return this.remote.post('/api/users/login', loginData);
  }

  logout(): Observable<boolean> {
    return Observable.of(true);
  }

  register(registerData) {
    return this.remote.post('/api/users/register', registerData);
  }

}
