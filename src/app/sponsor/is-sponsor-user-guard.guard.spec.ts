import { TestBed, async, inject } from '@angular/core/testing';

import { IsSponsorUserGuardGuard } from './is-sponsor-user-guard.guard';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('IsSponsorUserGuardGuard', () => {
  const storeStub = <Store<AppState>> {
    select: (selector) => Observable.of(undefined),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IsSponsorUserGuardGuard,
        {provide: Store, useValue: storeStub} ],
    });
  });

  it('should create...', inject([IsSponsorUserGuardGuard], (guard: IsSponsorUserGuardGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should disable activation on non logged in club-user',
    inject([IsSponsorUserGuardGuard], (guard: IsSponsorUserGuardGuard) => done => {

    const result = guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{}) as Observable<boolean>;

    result.subscribe(can => {
      expect(guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})).toEqual(Observable.of(false));
      done();
    });
  }));

  it('should enable activation on logged in club-user',
    inject([IsSponsorUserGuardGuard], (guard: IsSponsorUserGuardGuard) => done => {
    spyOn(this.store, 'subscribe').and.returnValue(Observable.of('test-sponsorid'));
    const result = guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{}) as Observable<boolean>;

    result.subscribe(can => {
      expect(guard.canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})).toEqual(Observable.of(true));
      done();
    });
  }));
});
