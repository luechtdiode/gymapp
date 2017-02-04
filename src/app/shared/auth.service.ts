import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { UrlProvider } from './urlProvider';
import { CrudService } from './crud.service';


@Injectable()
export class AuthService {

  private remote: CrudService;

  constructor(private crud: CrudService) {
    this.remote = crud.unsave();
  }

  login(loginData): Observable<any> {
    if (!(loginData.password) && (loginData.token) && this.crud.authenticated()) {
      return Observable.of(Object.assign({}, loginData, {success: true}));
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.remote.post('/api/users/login', loginData);
//    return Observable.of(Object.assign({}, loginData, {token: 'blabla', password: undefined} ));
  }

  logout(): Observable<boolean> {
    return Observable.of(true);
  }

  register(registerData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.remote.post('api/users/register', registerData);
  }

}
