import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterClubPageComponent } from './register-club-page.component';

describe('RegisterClubPageComponent', () => {
  let comp: RegisterClubPageComponent;
  let fixture: ComponentFixture<RegisterClubPageComponent>;
  let formBuilderStub: any;
  let storeStub: any;

  beforeEach(() => {
    formBuilderStub = {
      group: () => ({}),
    };
    storeStub = {
      dispatch: () => ({}),
    };
    TestBed.configureTestingModule({
      declarations: [ RegisterClubPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Store, useValue: storeStub },
      ],
    });
    fixture = TestBed.createComponent(RegisterClubPageComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
