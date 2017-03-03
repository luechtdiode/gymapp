import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterUserFormComponent } from './register-user-form.component';

describe('RegisterUserFormComponent', () => {
  let comp: RegisterUserFormComponent;
  let fixture: ComponentFixture<RegisterUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(RegisterUserFormComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
