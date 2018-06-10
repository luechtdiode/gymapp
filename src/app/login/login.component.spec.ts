/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../app-state.reducer';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const storeStub: Store<AppState> = <Store<AppState>>{
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      return of('aUrl');
    },
    dispatch: (action: Action) => {
      console.log('dispatching ', action);
    },
  };

  const routerStub = {
    navigate: (any) => { },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
      ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
