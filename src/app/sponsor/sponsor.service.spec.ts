/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SponsorService } from './sponsor.service';
import { Sponsor } from '../model/backend-typings';
import { Observable } from 'rxjs/Rx';
import { CrudService } from '../shared/crud.service';


describe('SponsorService', () => {
  const sponsorListStub: Sponsor[] = [
    <Sponsor>{
      _id: 'testId',
      name: 'Changed-Sponsorname',
      image: 'images/sponsor.png',
      homepage: '',
      kind: ['uio'],
    },
  ];

  const crudStub: CrudService = <CrudService>{
    unsave: () => crudStub,
    authenticated: () => false,
    post: (url: string, loginData) => {},
    get: (url: string) => Observable.of(sponsorListStub),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: SponsorService, useValue: new SponsorService(crudStub)},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SponsorService],
    });
  });

  it('should ...', inject([SponsorService], (service: SponsorService) => {
    expect(service).toBeTruthy();
  }));
});
