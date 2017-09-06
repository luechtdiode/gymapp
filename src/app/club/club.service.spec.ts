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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ClubService, useValue: new ClubService({})},
      ],
    })
    .compileComponents();
  }));

  it('should ...', inject([ClubService], (service: ClubService) => {
    expect(service).toBeTruthy();
  }));
});
