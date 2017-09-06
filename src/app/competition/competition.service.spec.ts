/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompetitionService } from './competition.service';
import { CrudService } from '../shared/crud.service';
import { Competition } from '../model/backend-typings';
import { Observable } from 'rxjs/Observable';

describe('CompetitionService', () => {
  const competitionListStub: Competition[] = [
    <Competition>{
      _id: 'testId',
      name: 'TestCompetition',
      image: 'images/competition.png',
      club: 'Testclub',
      kind: 'KuTu',
      location: 'Basel',
      dates: [new Date(2017, 0, 15)],
      description: 'Testdescription',
      website: 'www.testcompetition.gym',
    },
  ];
  const crudStub: CrudService = <CrudService>{};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CompetitionService, useValue: new CompetitionService(crudStub)},
      ],
    })
    .compileComponents();
  }));

  it('should ...', inject([CompetitionService], (service: CompetitionService) => {
    expect(service).toBeTruthy();
  }));
});
