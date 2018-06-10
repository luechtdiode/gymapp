import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClubDetailPageComponent } from './club-detail-page.component';
import { ClubListComponent } from '../club-list/club-list.component';
import { ClubMediaComponent } from '../club-media/club-media.component';
import { Observable, of } from 'rxjs';

describe('ClubDetailPageComponent', () => {
  let comp: ClubDetailPageComponent;
  let fixture: ComponentFixture<ClubDetailPageComponent>;

  beforeEach(() => {
    const routerStub = {
      routerState: {
        snapshot: {
          root: {
            firstChild: {
              paramMap: {
                get: () => 'testid',
              },
            },
          },
        },
      },
    };
    const storeStub = {
      dispatch: () => ({}),
      select: () => ({
        subscribe: () =>of({}),
      }),
    };
    TestBed.configureTestingModule({
      declarations: [ ClubDetailPageComponent, ClubListComponent, ClubMediaComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
      ],
    });
    fixture = TestBed.createComponent(ClubDetailPageComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('loadingmessage defaults to: loading ...', () => {
    expect(comp.loadingmessage).toEqual('loading ...');
  });

  it('isClubUser defaults to: false', () => {
    expect(comp.isClubUser).toEqual(false);
  });

});
