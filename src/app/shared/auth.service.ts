import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CrudService } from './crud.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

declare var window: any;
declare var document: any;

@Injectable()
export class AuthService {

  private remote: CrudService;

  createWindow(url: string, name: string = 'Window', width: number = 500, height: number = 600, left: number = 0, top: number = 0) {
    if (url == null) {
        return null;
    }

    const options = `width=${width},height=${height},left=${left},top=${top}`;

    return window.open(url, name, options);
  }

  constructor(private crud: CrudService,
              private router: Router) {
    this.remote = crud.unsave();
  }

  login(loginData): Observable<any> {
    if (!(loginData.password) && (loginData.token) && this.crud.authenticated(loginData.token)) {
      // return Observable.of(Object.assign({}, loginData, {success: true}));
      return this.remote.post('/api/auth/login/renew', loginData);
    }
    return this.remote.post('/api/auth/login', loginData);
  }

  logout(): Observable<boolean> {
    return Observable.of(true);
  }

  register(registerData) {
    return this.remote.post('/api/auth/register', registerData);
  }

  profile() {
    return this.remote.get('/api/users/profile');
  }

  loginViaSocialAccount(provider: string) {
    const url = document.location.origin + '/api/auth/' + provider;
    window.location.href = url;
    // return this.remote.get('/api/auth/facebook');
  }

  connectWithSocialProvider(provider: string) {
    // const handle = this.createWindow(document.location.href + '/api/connect/facebook', 'Facebook connect');
    const url = document.location.origin + '/api/connect/' + provider;
    window.location.href = url;

    // let loopCount = 600;
    // const fbPromise = new Subject();
    // function closeWindow() {
    //   clearInterval(intervalId);
    //   // handle.close();
    //   fbPromise.next({status: 'ok'});
    // }
    // const intervalId = setInterval(() => {
    //   console.log('loopCount', loopCount);
    //   if (loopCount-- < 0) {
    //     closeWindow();
    //   } else {
    //     let href: string;
    //     try {
    //         href = document.location.href;
    //         console.log(href);
    //     } catch (e) {
    //         //console.log('Error:', e);
    //     }
    //     if (href.indexOf('/facebook/callback?') > -1) {
    //       closeWindow();
    //     }
    //   }
    // }, 100);
    // return fbPromise;
    // return this.crud.get('/api/connect/facebook');
  }

  disconnectFromSocialProvider(userid: string, provider: string) {
    return this.crud.put('/api/disconnect/' + provider + '/', {id: userid});
  }

}
