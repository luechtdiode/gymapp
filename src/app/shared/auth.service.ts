import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor() {}

  login(loginData): Observable<any> {
    return Observable.of(Object.assign({}, loginData, {token: 'blabla', password: undefined} ));
  }

  logout(): Observable<boolean> {
    return Observable.of(true);
  }

  register(registerData) {}

}
