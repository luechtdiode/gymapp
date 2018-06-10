import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompetitionDetailPageComponent } from './competition-detail-page.component';
import { CompetitionListComponent } from '../competition-list/competition-list.component';
import { Observable, of } from 'rxjs';

describe('CompetitionDetailPageComponent', () => {
  let comp: CompetitionDetailPageComponent;
  let fixture: ComponentFixture<CompetitionDetailPageComponent>;

  beforeEach(() => {
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
        subscribe: () =>of({}),
      }),
    };

    TestBed.configureTestingModule({
      declarations: [ CompetitionDetailPageComponent, CompetitionListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub },
      ],
    });
    fixture = TestBed.createComponent(CompetitionDetailPageComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
