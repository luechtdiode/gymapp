import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SponsorActionFormComponent } from './sponsor-action-form.component';

describe('SponsorActionFormComponent', () => {
  let comp: SponsorActionFormComponent;
  let fixture: ComponentFixture<SponsorActionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorActionFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });
    fixture = TestBed.createComponent(SponsorActionFormComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
