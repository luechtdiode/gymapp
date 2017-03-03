import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClubFormComponent } from './club-form.component';

describe('ClubFormComponent', () => {
  let comp: ClubFormComponent;
  let fixture: ComponentFixture<ClubFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(ClubFormComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
