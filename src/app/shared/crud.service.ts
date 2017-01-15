import {Injectable} from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {UrlProvider} from './urlProvider';
import {Router} from '@angular/router';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'token',
    tokenGetter: (() => sessionStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: true
  }), http, options);
}

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class CrudService {
  

  constructor(private authHttp: AuthHttp) {
  }

  public get<T>(url: string): Observable<T> {
    return this.wrapCallAndMap<T>(this.authHttp.get(UrlProvider.getBackendUrl(url)));
  }

  public post<T>(url: string, data: T): Observable<T> {
    const json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.authHttp.post(UrlProvider.getBackendUrl(url), json, HEADER));
  }

  public put<T>(url: string, data: T): Observable<T> {
    const json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.authHttp.put(UrlProvider.getBackendUrl(url), json, HEADER));
  }

  public doDelete(url: string): Observable<Response> {
    return this.wrapCall<Response>(this.authHttp.delete(UrlProvider.getBackendUrl(url)));
  }

  private wrapCallAndMap<T>(observable: Observable<Response>): Observable<T> {
    return this.wrapCall<T>(observable, this.responseToJsonObject);
  }

  private wrapCall<T>(observable: Observable<Response>, mapper: (n: Response) => any = n => n): Observable<T> {
    const subject = new Subject<T>();
    observable.subscribe(
      value => subject.next(mapper(value)),
      error => {
        if (!this.interceptError(error)) {
          subject.error(error);
        }
      },
      () => subject.complete()
    );
    return subject.asObservable();
  }

  private responseToJsonObject(res: Response): any {
    const body = res.json();
    return body || {};
  }

  private interceptError(error: Error) {
    console.log('error', error);
    if (error.message === 'No JWT present or has expired') {
      console.log('no JWT, redirecting to login page');
      // this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
}
