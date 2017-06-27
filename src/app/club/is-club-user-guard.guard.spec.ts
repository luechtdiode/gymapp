import { TestBed, async, inject } from '@angular/core/testing';

import { IsClubUserGuardGuard } from './is-club-user-guard.guard';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('IsClubUserGuard', () => {
  const storeStub = <Store<AppState>> {
    select: (selector) => Observable.of(undefined),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IsClubUserGuardGuard,
        {provide: Store, useValue: storeStub} ],
    });
  });

  it('should create...', inject([IsClubUserGuardGuard], (guard: IsClubUserGuardGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should disable activation on non logged in club-user',
    inject([IsClubUserGuardGuard], (guard: IsClubUserGuardGuard) => done => {

    const result = guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{}) as Observable<boolean>;

    result.subscribe(can => {
      expect(guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})).toEqual(Observable.of(false));
      done();
    });
  }));

  it('should enable activation on logged in club-user',
    inject([IsClubUserGuardGuard], (guard: IsClubUserGuardGuard) => done => {
    spyOn(this.store, 'subscribe').and.returnValue(Observable.of('test-clubid'));
    const result = guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{}) as Observable<boolean>;

    result.subscribe(can => {
      expect(guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})).toEqual(Observable.of(true));
      done();
    });
  }));
});
