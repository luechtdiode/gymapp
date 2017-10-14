import { Injectable, OnDestroy } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';

import { UrlProvider } from './urlProvider';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, activeRoute } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { ElevateAction } from './auth.actions';

declare var sessionStorage: any;

const JWT_TOKEN_NAME = 'x-access-token';
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(
    new AuthConfig(
      {
        headerName: 'x-access-token',
        headerPrefix: '',
        noTokenScheme: true,
        tokenName: 'x-access-token',
        tokenGetter: (() => {
          console.log('getting jwt-token');
          return sessionStorage.getItem(JWT_TOKEN_NAME); }),
        globalHeaders: [ {'Content-Type': 'application/json'} ],
        noJwtError: false,
      },
    ),
    http,
    options,
  );
}

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class CrudService implements OnDestroy {

  private currentUrl: string;
  private useAuth = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private http?: Http,
    private authHttp?: AuthHttp,
    private store?: Store<AppState>,
    private route?: ActivatedRoute,
    private urlProvider?: UrlProvider) {

    this.subscriptions.push(store.select(fromRoot.getGWToken).subscribe((token) => {
      sessionStorage.setItem(JWT_TOKEN_NAME, token);
    } ));
    this.subscriptions.push(store.select(activeRoute).filter(rt => !!rt).subscribe((rt) => {
      this.currentUrl = rt.state.url;
    } ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public authenticated(token: string) {
    const t = token === undefined ? sessionStorage.getItem(JWT_TOKEN_NAME) : token;
    return t !== undefined
        && tokenNotExpired(JWT_TOKEN_NAME, t.toString());
  }

  public unsave(): CrudService {
    return Object.assign(Object.create(this), this, {useAuth: false});
  }

  public get<T>(url: string): Observable<T> {
    return this.wrapCallAndMap<T>(this.getRemote().get(this.urlProvider.getBackendUrl(url)));
  }

  public post<T>(url: string, data: T): Observable<T> {
    const json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.getRemote().post(this.urlProvider.getBackendUrl(url), json, HEADER));
  }

  public put<T>(url: string, data: T): Observable<T> {
    const json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.getRemote().put(this.urlProvider.getBackendUrl(url), json, HEADER));
  }

  public doDelete(url: string): Observable<Response> {
    return this.wrapCall<Response>(this.getRemote().delete(this.urlProvider.getBackendUrl(url), HEADER));
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
        subject.complete();
      },
      () => subject.complete(),
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
      this.store.dispatch(new ElevateAction(this.currentUrl));
      return true;
    }
    if (error.message === 'JWT must have 3 parts') {
      console.log('invalid jwt-token', error);
      this.store.dispatch(new ElevateAction(this.currentUrl));
      return true;
    }
    return false;
  }

  private getRemote(): Http | AuthHttp {
    if (this.useAuth) {
      return this.authHttp;
    } else {
      return this.http;
    }
  }

}
