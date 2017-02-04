/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SponsorsPageComponent } from './sponsors-page.component';
import { SponsorListComponent } from '../sponsor-list/sponsor-list.component';
import { SponsorMediaComponent } from '../sponsor-media/sponsor-media.component';
import { Store, StoreModule } from '@ngrx/store';

import { Sponsor } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromSponsor from '../sponsor.actions';

fdescribe('SponsorsPageComponent', () => {
  let component: SponsorsPageComponent;
  let fixture: ComponentFixture<SponsorsPageComponent>;
  let storeStub: Sponsor[];

  beforeEach(async(() => {
    storeStub = [];
    TestBed.configureTestingModule({
      declarations: [ SponsorsPageComponent, SponsorListComponent, SponsorMediaComponent ],
      providers: [
          {provide: Store, useValue: storeStub}
      ],
      imports: [
          StoreModule.provideStore(fromRoot.getSponsors),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
