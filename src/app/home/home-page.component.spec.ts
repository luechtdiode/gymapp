/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { HomePageComponent } from './home-page.component';
import { ClubMediaComponent } from '../club/club-media/club-media.component';
import { CompetitionMediaComponent } from '../competition/competition-media/competition-media.component';
import { SponsorMediaComponent } from '../sponsor/sponsor-media/sponsor-media.component';
import { Club, Sponsor, Competition } from '../model/backend-typings';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import * as fromCompetition from '../competition/competition.actions';
import * as fromClub from '../club/club.actions';
import * as fromSponsor from '../sponsor/sponsor.actions';
import { Observable } from 'rxjs/Observable';

describe('HomeComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const clubStub = <Club>{
    _id: 'testId',
    name: 'Changed-Clubname',
    image: 'images/club.png',
    homepage: '',
    kind: ['uio'],
  };

  const sponsorStub = <Sponsor>{
    name: 'Changed-Sponsorname',
    image: 'images/changed-sponsor.png',
    slogan: 'Changed Slogan of sponsor',
    homepage: undefined,
    sponsoractions: [],
  };

  const competitionStub = <Competition>{
    _id: 'testId',
    name: 'TestCompetition',
    image: 'images/competition.png',
    club: 'Testclub',
    kind: 'KuTu',
    location: 'Basel',
    dates: [new Date(2017, 0, 15)],
    description: 'Testdescription',
    website: 'www.testcompetition.gym',
  };

  const storeStub: Store<AppState> = <Store<AppState>>{
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      if (selector === fromRoot.getFeaturedCompetition) {
        return Observable.of(competitionStub);
      }
      if (selector === fromRoot.getFeaturedClub) {
        return Observable.of(clubStub);
      }
      if (selector === fromRoot.getFeaturedSponsor) {
        return Observable.of(sponsorStub);
      }
      return Observable.of(false);
    },
    dispatch: (action: Action) => {
      console.log('dispatching ', action);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, ClubMediaComponent, CompetitionMediaComponent, SponsorMediaComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Store, useValue: storeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
