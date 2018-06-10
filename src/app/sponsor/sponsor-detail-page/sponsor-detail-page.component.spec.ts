import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDetailPageComponent } from './sponsor-detail-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

describe('SponsorDetailPageComponent', () => {
  let component: SponsorDetailPageComponent;
  let fixture: ComponentFixture<SponsorDetailPageComponent>;

  const routerStub = {
      routerState: {
        snapshot: {
          root: {
            firstChild: {
              paramMap: {
                get: () => 'testid',
              },
            },
          },
        },
      },
    };

  const storeStub = {
      dispatch: () => ({}),
      select: () => ({
        subscribe: () => new Subscription(),
      }),
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDetailPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
