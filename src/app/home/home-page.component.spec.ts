/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomePageComponent } from './home-page.component';
import { ClubMediaComponent } from '../club/club-media/club-media.component';
import { CompetitionMediaComponent } from '../competition/competition-media/competition-media.component';
import { SponsorMediaComponent } from '../sponsor/sponsor-media/sponsor-media.component';

describe('HomeComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, ClubMediaComponent, CompetitionMediaComponent, SponsorMediaComponent ]
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
