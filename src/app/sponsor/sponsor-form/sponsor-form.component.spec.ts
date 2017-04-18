/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SponsorFormComponent } from './sponsor-form.component';
import { FormBuilder } from '@angular/forms';
import { SplitCurrency } from '../../shared/split-currency.pipe';

describe('SponsorFormComponent', () => {
  let component: SponsorFormComponent;
  let fixture: ComponentFixture<SponsorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorFormComponent, SplitCurrency ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ FormBuilder, SplitCurrency ],
    });
    fixture = TestBed.createComponent(SponsorFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
