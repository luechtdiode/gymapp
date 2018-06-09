import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import { User } from '../model/backend-typings';
import { ProfileAction, LoginAction } from '../shared/auth.actions';
import { RouterPath } from '../router-path';
import { goRelative } from '../app.routing';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  loggedIn: Observable<boolean>;
  loggedInValue: boolean;

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loggedInValue && next.paramMap.get('token')) {
      const action = new LoginAction(true, <User>{token: next.paramMap.get('token')}, RouterPath.PROFILE);
      this.store.dispatch(action);
    }
    return this.loggedIn;
  }

  constructor(private store: Store<AppState>) {
    this.loggedIn = this.store.select(fromRoot.isLoggedIn);
    this.loggedIn.subscribe(loggedInValue => this.loggedInValue = loggedInValue);
  }
}
