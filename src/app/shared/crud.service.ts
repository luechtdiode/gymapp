import { Injectable, OnDestroy } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { UrlProvider } from './urlProvider';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, activeRoute } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { elevateAction } from './auth.actions';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(
    new AuthConfig(
      {
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        noTokenScheme: true,
        tokenName: 'x-access-token',
        tokenGetter: (() => sessionStorage.getItem('x-access-token')),
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
    private http: Http,
    private authHttp: AuthHttp,
    private store: Store<AppState>,
    private route: ActivatedRoute) {

    this.subscriptions.push(store.select(fromRoot.getGWToken).subscribe((token) => {
      sessionStorage.setItem('x-access-token', token);
    } ));
    this.subscriptions.push(store.select(activeRoute).subscribe((rt) => {
      this.currentUrl = rt.path;
    } ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public authenticated() {
    return sessionStorage.getItem('x-access-token') !== undefined;
  }

  public unsave(): CrudService {
    return Object.assign(Object.create(this), this, {useAuth: false});
  }

  public get<T>(url: string): Observable<T> {
    return this.wrapCallAndMap<T>(this.getRemote().get(UrlProvider.getBackendUrl(url)));
  }

  public post<T>(url: string, data: T): Observable<T> {
    const json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.getRemote().post(UrlProvider.getBackendUrl(url), json, HEADER));
  }

  public put<T>(url: string, data: T): Observable<T> {
    const json = JSON.stringify(data);
    return this.wrapCallAndMap<T>(this.getRemote().put(UrlProvider.getBackendUrl(url), json, HEADER));
  }

  public doDelete(url: string): Observable<Response> {
    return this.wrapCall<Response>(this.getRemote().delete(UrlProvider.getBackendUrl(url)));
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
      this.store.dispatch(elevateAction(this.currentUrl));
      return true;
    }
    if (error.message === 'JWT must have 3 parts') {
      console.log('invalid jwt-token', error);
      this.store.dispatch(elevateAction(this.currentUrl));
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
