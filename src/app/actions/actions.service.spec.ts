import { TestBed, inject, async } from '@angular/core/testing';

import { ActionsService } from './actions.service';
import { Action } from '../model/backend-typings';
import { CrudService } from '../shared/crud.service';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

describe('ActionsService', () => {
  const actionsStub: Action[] = [
    <Action>{
      _id: 'testId',
      name: 'action-name',
    },
  ];

  const crudStub: CrudService = <CrudService>{
    unsave: () => crudStub,
    authenticated: (token: string) => false,
    post: (url: string, loginData) => {},
    get: (url: string) =>of(actionsStub),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActionsService, useValue: new ActionsService(crudStub)},
      ],
    })
    .compileComponents();
  }));

  it('should be instatiatable', inject([ActionsService], (service: ActionsService) => {
    expect(service).toBeTruthy();
  }));

  it('should load Actions', inject([ActionsService], (service: ActionsService) => {
    service.loadActions().subscribe(actions => {
      expect(actions).toEqual(actionsStub);
    });
  }));
});
