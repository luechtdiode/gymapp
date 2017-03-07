import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';

@Injectable()
export class IsClubUserGuardGuard implements CanActivate {
  clubid: Observable<string>;

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.clubid.map((id: string) => !!id);
  }

  constructor(private store: Store<AppState>) {
    this.clubid = this.store.select(fromRoot.isMemberOfClub);
  }
}
