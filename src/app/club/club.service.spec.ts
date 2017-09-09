/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { CrudService } from '../shared/crud.service';
import { ClubService } from './club.service';
import { Club } from '../model/backend-typings';

describe('ClubService', () => {
  const clubListStub: Club[] = [
    <Club>{
      _id: 'testId',
      name: 'Changed-Clubname',
      image: 'images/club.png',
      homepage: '',
      kind: ['uio'],
    },
  ];
  const crudStub: CrudService = <CrudService>{
    unsave: () => crudStub,
    authenticated: (token: string) => false,
    post: (url: string, loginData) => {},
    get: (url: string) => Observable.of(clubListStub),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ClubService, useValue: new ClubService(crudStub)},
      ],
    })
    .compileComponents();
  }));

  it('should ...', inject([ClubService], (service: ClubService) => {
    expect(service).toBeTruthy();
  }));
});
