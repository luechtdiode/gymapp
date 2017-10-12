import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import { User } from '../model/backend-typings';
import { ProfileAction } from '../shared/auth.actions';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  loggedIn: Observable<boolean>;
  loggedInValue: boolean;

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loggedInValue  &&  next.paramMap.get('token') !== undefined) {
      const action = new ProfileAction();
      action.payload = next.paramMap.get('token');
      this.store.dispatch(action);
    }
    return this.loggedIn;
  }

  constructor(private store: Store<AppState>) {
    this.loggedIn = this.store.select(fromRoot.isLoggedIn);
    this.loggedIn.subscribe(loggedInValue => this.loggedInValue = loggedInValue);
  }
}
