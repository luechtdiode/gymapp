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

const action1 = <RawAction>{
    _id: 'testaction1',
    name: 'testaction1',
  };

const action2 = <RawAction>{
    _id: 'testaction2',
    name: 'testaction2',
  };

describe('CompetitionListComponent', () => {
  let component: CompetitionListComponent;
  let fixture: ComponentFixture<CompetitionListComponent>;
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

  it('should filter Sponsors by matching actions when Competition is set', () => {
    // expect unfiltered sponsorlist
    expect(component.items.length).toEqual(3);

    component.supportingSponsor = <Sponsor>{
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
    fixture.detectChanges();

    // expect filtered sponsorlist
    expect(component.items.length).toEqual(2);
  });
});
