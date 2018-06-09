import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { UrlProvider } from './urlProvider';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, activeRoute } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { ElevateAction } from './auth.actions';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var sessionStorage: any;

const JWT_TOKEN_NAME = 'x-access-token';

const HEADER = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class CrudService implements OnDestroy {

  private currentUrl: string;
  private useAuth = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private http?: HttpClient,
    private jwtHelper?: JwtHelperService,
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
        && this.jwtHelper.isTokenExpired(JWT_TOKEN_NAME, t.toString());
  }

  public unsave(): CrudService {
    return Object.assign(Object.create(this), this, {useAuth: false});
  }

  public get<T>(url: string): Observable<T> {
    return this.wrapCall<T>(this.getRemote().get<T>(this.urlProvider.getBackendUrl(url)));
  }

  public post<T>(url: string, data: T): Observable<T> {
    return this.wrapCall<T>(this.getRemote().post<T>(this.urlProvider.getBackendUrl(url), data, HEADER));
  }

  public put<T>(url: string, data: T): Observable<T> {
    const json = JSON.stringify(data);
    return this.wrapCall<T>(this.getRemote().put<T>(this.urlProvider.getBackendUrl(url), json, HEADER));
  }

  public doDelete<T>(url: string): Observable<T> {
    return this.wrapCall<T>(this.getRemote().delete<T>(this.urlProvider.getBackendUrl(url), HEADER));
  }

  private wrapCallAndMap<T>(observable: Observable<T>): Observable<T> {
    return this.wrapCall<T>(observable);
  }

  private wrapCall<T>(observable: Observable<T>): Observable<T> {
    const subject = new Subject<T>();
    observable.subscribe(
      value => subject.next(value),
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

  private getRemote(): HttpClient {
    if (this.useAuth) {
      return this.http;
    } else {
      return this.http;
    }
  }

}
