/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SponsorListComponent } from './sponsor-list.component';
import { SponsorMediaComponent } from '../sponsor-media/sponsor-media.component';
import { Store, Action, StoreModule } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { reducer } from '../../app-state.reducer';
import { Sponsor } from '../../model/backend-typings';
import { Observable } from 'rxjs/Observable';

describe('SponsorListComponent', () => {
  let component: SponsorListComponent;
  let fixture: ComponentFixture<SponsorListComponent>;
  const sponsorListStub: Sponsor[] = [
    <Sponsor>{
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: undefined,
      sponsoractions: [],
    },
  ];
  const storeStub: Store<AppState> = <Store<AppState>> {
        select: (selector: any, ...paths: string[]) => {
          console.log('selecting ', selector);
          return Observable.of(sponsorListStub);
        },
        dispatch: (action: Action) => {
          console.log('dispatching ', action);
        },
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorListComponent, SponsorMediaComponent ],
      providers: [
        {provide: Store, useValue: storeStub},
      ],
      imports: [
        StoreModule.provideStore({reducer}),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
