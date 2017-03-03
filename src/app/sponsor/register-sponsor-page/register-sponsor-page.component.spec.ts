/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { RegisterSponsorPageComponent } from './register-sponsor-page.component';
import { Sponsor } from '../../model/backend-typings';
import { Store, Action, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, reducer } from '../../app-state.reducer';
import { FormBuilder } from '@angular/forms';

describe('RegisterSponsorPageComponent', () => {
  let component: RegisterSponsorPageComponent;
  let fixture: ComponentFixture<RegisterSponsorPageComponent>;

  const sponsorListStub: Sponsor[] = [
    <Sponsor>{
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: undefined,
      sponsoractions: [],
    },
  ];

  const storeStub: Store<AppState> = <Store<AppState>>{
    select: (selector: any, ...paths: string[]) => {
      console.log('selecting ', selector);
      return Observable.of(sponsorListStub);
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSponsorPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Store, useValue: storeStub }
      ],
      imports: [
        StoreModule.provideStore({ reducer })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSponsorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
