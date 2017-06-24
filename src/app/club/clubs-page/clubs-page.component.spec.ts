/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, Action, StoreModule } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { reducer } from '../../app-state.reducer';
import { Observable } from 'rxjs/Observable';

import { ClubsPageComponent } from './clubs-page.component';
import { ClubListComponent } from '../club-list/club-list.component';
import { ClubMediaComponent } from '../club-media/club-media.component';
import { Club } from '../../model/backend-typings';

describe('ClubsPageComponent', () => {
  let component: ClubsPageComponent;
  let fixture: ComponentFixture<ClubsPageComponent>;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsPageComponent, ClubListComponent, ClubMediaComponent ],
      providers: [
        {provide: Store, useValue: storeStub},
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        StoreModule.provideStore({reducer}),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
