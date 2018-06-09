/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, Action, StoreModule } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { reducers } from '../../app-state.reducer';
import { Observable } from 'rxjs/Observable';

import { ClubListComponent } from './club-list.component';
import { ClubMediaComponent } from '../club-media/club-media.component';
import { Club } from '../../model/backend-typings';
import { Router } from '@angular/router';

describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;

  const clubListStub: Club[] = [
    <Club>{
      _id: 'testId',
      name: 'Changed-Clubname',
      image: 'images/club.png',
      homepage: '',
      kind: ['uio'],
    },
  ];
  const storeStub: Store<AppState> = <Store<AppState>> {
        select: (selector: any, ...paths: string[]) => {
          console.log('selecting ', selector);
          return Observable.of(clubListStub);
        },
        dispatch: (action: Action) => {
          console.log('dispatching ', action);
        },
    };

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubListComponent, ClubMediaComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        StoreModule.forRoot(reducers),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
