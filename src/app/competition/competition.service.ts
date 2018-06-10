import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';





import {Competition} from '../model/backend-typings';
import {CrudService} from '../shared/crud.service';
import {TestDataGenerator} from '../model/test.data.generator';

const BASE_URL = 'api/competitions/';

@Injectable()
export class CompetitionService {
  // data = TestDataGenerator.generateCompetitions();

  constructor(private crud: CrudService) {
  }

  saveCompetition(competition: Competition): Observable<Competition> {
    console.log('saveCompetition');
    // this.data = [...this.data.filter(c => c._id !== competition._id), competition];
    // returnof(competition);
    if (competition._id) {
      return this.crud.put<Competition>(`${BASE_URL}${competition._id}`, competition);
    } else {
      return this.crud.post<Competition>(BASE_URL, competition);
    }
  }

  getFeaturedCompetition(): Observable<Competition> {
    console.log('getFeaturedCompetition');
    // returnof(this.data[0]);
    return this.crud.unsave().get<Competition>(BASE_URL + 'next/');
  }

  getCompetitions(): Observable<Competition[]> {
    console.log('getCompetitions');
    return this.crud.unsave().get<Competition[]>(BASE_URL);
      // .map(competitions => Observable.from(competitions)
      //   .map(competition => this.mapService.enrichLocationWithCoordinate(competition))
      //   .concatAll()
      //   .toArray())
      // .concatAll();
  }

  getCompetition(id: string): Observable<Competition> {
    console.log('getCompetition');
    // returnof(this.data[+id]);
    return this.crud.unsave().get<Competition>(`${BASE_URL}${id}`);
      // .flatMap(competition => this.mapService.enrichLocationWithCoordinate(competition));
  }

  deleteCompetition(id: string): Observable<any> {
    console.log('deleteCompetition');
    // this.data = [...this.data.filter(c => c._id !== id)];
    // returnof(undefined);
    return this.crud.doDelete(`${BASE_URL}${id}`);
  }
}
