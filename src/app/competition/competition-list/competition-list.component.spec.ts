/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, Action, StoreModule } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { reducer } from '../../app-state.reducer';
import { Observable } from 'rxjs/Observable';

import { CompetitionListComponent } from './competition-list.component';
import { CompetitionMediaComponent } from '../competition-media/competition-media.component';
import { Sponsor, Competition, CompSponsorAction, Action as RawAction, SponsorAction } from '../../model/backend-typings';

describe('CompetitionListComponent', () => {
  let component: CompetitionListComponent;
  let fixture: ComponentFixture<CompetitionListComponent>;

  const action1 = <RawAction>{
      _id: 'testaction1',
      name: 'testaction1',
    };

  const action2 = <RawAction>{
      _id: 'testaction2',
      name: 'testaction2',
    };

  const competitionListStub: Competition[] = [
    <Competition>{
      _id: 'testId',
      name: 'TestCompetition',
      image: 'images/competition.png',
      club: 'Testclub',
      kind: 'KuTu',
      location: 'Basel',
      dates: [new Date(2017, 0, 15)],
      description: 'Testdescription',
      sponsoractions: [<CompSponsorAction>{
          action: action1,
          costperaction: 10.00,
          maxcnt: 100,
      }],
      website: 'www.testcompetition.gym',
    },
    <Competition>{
      _id: 'testId2',
      name: 'TestCompetition2',
      image: 'images/competition.png',
      club: 'Testclub',
      kind: 'Test',
      location: 'Basel',
      dates: [new Date(2017, 0, 15)],
      description: 'Testdescription',
      sponsoractions: [<CompSponsorAction>{
          action: action2,
          costperaction: 10.00,
          maxcnt: 100,
      }],
      website: 'www.testcompetition.gym',
    },
    <Competition>{
      _id: 'testId3',
      name: 'TestCompetition3',
      image: 'images/competition.png',
      club: 'Testclub',
      kind: 'Test',
      location: 'Basel',
      dates: [new Date(2017, 0, 15)],
      description: 'Testdescription',
      sponsoractions: [<CompSponsorAction>{
          action: action2,
          costperaction: 10.00,
          maxcnt: 100,
      }],
      website: 'www.testcompetition.gym',
    },
  ];

  const sponsorStub = <Sponsor>{
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
        kinds: ['Test'],
      }],
  };
  const storeStub: Store<AppState> = <Store<AppState>> {
        select: (selector: any, ...paths: string[]) => {
          console.log('selecting ', selector);
          return Observable.of(competitionListStub);
        },
        dispatch: (action: Action) => {
          console.log('dispatching ', action);
        },
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionListComponent, CompetitionMediaComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
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
    fixture = TestBed.createComponent(CompetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all Competitions', () => {
    expect(component.items.length).toEqual(3);
  });

  it('should list all kindItems (unfiltered)', () => {
    expect(component.kindItems.length).toEqual(4);
    expect(component.kindItems.find(item => item === 'All')).toBeDefined();
    expect(component.kindItems.find(item => item === 'Test')).toBeDefined();
    expect(component.kindItems.find(item => item === 'KuTu')).toBeDefined();
    expect(component.kindItems.find(item => item === 'Other')).toBeDefined();
  });

  it('should filter Competitions by matching actions when supporting Sponsor is set', () => {
    component.supportingSponsor = sponsorStub;
    fixture.detectChanges();

    expect(component.items.length).toEqual(2);
  });

  it('should show reduced set of kindItems by matching actions when supporting Sponsor is set', () => {
    component.supportingSponsor = sponsorStub;
    fixture.detectChanges();

    expect(component.kindItems.length).toEqual(1);
    expect(component.kindItems.find(item => item === 'All')).toBeDefined();
  });
});
