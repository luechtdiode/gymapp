import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSponsorPageComponent } from './edit-sponsor-page.component';
import { SponsorFormComponent } from '../sponsor-form/sponsor-form.component';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { Sponsor } from '../../model/backend-typings';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('EditSponsorPageComponent', () => {
  let component: EditSponsorPageComponent;
  let fixture: ComponentFixture<EditSponsorPageComponent>;

  const sponsorListStub: Sponsor[] = [
    <Sponsor>{
      _id: 'testId',
      name: 'Changed-Sponsorname',
      image: 'images/sponsor.png',
      homepage: '',
      kind: ['uio'],
    },
  ];
  const storeStub: Store<AppState> = <Store<AppState>> {
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      return of(sponsorListStub);
    },
    dispatch: (action: Action) => {
      console.log('dispatching ', action);
    },
  };
  const formStub = {
    patchValue: () => ({}),
  };
  const formBuilderStub = {
    group: () => formStub,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSponsorPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Store, useValue: storeStub },
      ],
    });
    fixture = TestBed.createComponent(EditSponsorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
