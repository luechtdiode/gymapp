/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { EditClubPageComponent } from './edit-club-page.component';
import { FormBuilder } from '@angular/forms';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Club } from "../../model/backend-typings";
import { AppState } from '../../app-state.reducer';

describe('EditClubPageComponent', () => {
  let component: EditClubPageComponent;
  let fixture: ComponentFixture<EditClubPageComponent>;

  const clubListStub: Club[] = [
    <Club>{
      _id: 'testId',
      name: 'Changed-Clubname',
      image: 'images/club.png',
      homepage: '',
      kind: ['uio']
    }
  ];
  const storeStub: Store<AppState> = <Store<AppState>> {
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      return Observable.of(clubListStub);
    },
    dispatch: (action: Action) => {
      console.log('dispatching ', action);
    }
  };
  const formStub = {
    patchValue: () => ({}),
  };
  const formBuilderStub = {
    group: () => formStub,
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClubPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(EditClubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
