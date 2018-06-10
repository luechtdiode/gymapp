/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SponsorListComponent } from './sponsor-list.component';
import { SponsorMediaComponent } from '../sponsor-media/sponsor-media.component';
import { Store, Action, StoreModule } from '@ngrx/store';
import { AppState, reducers } from '../../app-state.reducer';
import { Sponsor, Competition, CompSponsorAction, Action as RawAction, SponsorAction } from '../../model/backend-typings';
import { Observable, of } from 'rxjs';

const action1 = <RawAction>{
    _id: 'testaction1',
    name: 'testaction1',
  };

const action2 = <RawAction>{
    _id: 'testaction2',
    name: 'testaction2',
  };

describe('SponsorListComponent', () => {
  let component: SponsorListComponent;
  let fixture: ComponentFixture<SponsorListComponent>;
  const sponsorListStub: Sponsor[] = [
    <Sponsor>{
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: undefined,
      sponsoractions: [
        <SponsorAction>{
          action: action1,
          bidperaction: 10.00,
          maxcnt: 10.00,
          kinds: ['Test'],
        },
        <SponsorAction>{
          action: action2,
          bidperaction: 10.00,
          maxcnt: 10.00,
          kinds: ['KuTu'],
        },
        <SponsorAction>{
          action: action1,
          bidperaction: 10.00,
          maxcnt: 10.00,
          kinds: ['KuTu']}],
    },
    <Sponsor>{
      name: 'Sponsor2',
      image: 'images/sponsor2.png',
      slogan: 'Slogan of sponsor2',
      homepage: undefined,
      sponsoractions: [
        <SponsorAction>{
          action: action1,
          bidperaction: 10.00,
          maxcnt: 10.00,
          kinds: ['Test'],
        },
        <SponsorAction>{
          action: action2,
          bidperaction: 10.00,
          maxcnt: 10.00,
          kinds: ['KuTu'],
        }],
    },
  ];
  const storeStub: Store<AppState> = <Store<AppState>> {
        select: (selector: any, ...paths: string[]) => {
          console.log('selecting ', selector);
          return of(sponsorListStub);
        },
        dispatch: (action: Action) => {
          console.log('dispatching ', action);
        },
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorListComponent, SponsorMediaComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {provide: Store, useValue: storeStub},
      ],
      imports: [
        StoreModule.forRoot(reducers),
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

  it('should filter Sponsors by matching actions when Competition is set', () => {
    // expect unfiltered sponsorlist
    expect(component.items.length).toEqual(2);

    component.supportingCompetition = <Competition>{
      _id: 'testId',
      name: 'TestCompetition',
      image: 'images/competition.png',
      club: 'Testclub',
      kind: 'KuTu',
      location: 'Basel',
      dates: [new Date(2017, 0, 15)],
      sponsoractions: [<CompSponsorAction>{
          action: action1,
          costperaction: 10.00,
          maxcnt: 100,
      }],
      description: 'Testdescription',
      website: 'www.testcompetition.gym',
    };
    fixture.detectChanges();

    // expect filtered sponsorlist
    expect(component.items.length).toEqual(1);
  });
});
