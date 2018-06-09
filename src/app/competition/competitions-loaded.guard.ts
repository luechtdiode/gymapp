
import {map} from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import { LoadAllAction } from './competition.actions';

@Injectable()
export class CompetitionsLoadedGuard implements CanActivate {
  loaded: Observable<boolean>;

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loaded.pipe(map(ready => {
      if (!ready) {
        this.store.dispatch(new LoadAllAction());
      }
      return true;
    }));
  }

  constructor(private store: Store<AppState>) {
    this.loaded = this.store.select(fromRoot.isCompetitionsLoadingOrLoaded);
  }
}
