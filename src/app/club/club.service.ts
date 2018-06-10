import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Club } from '../model/backend-typings';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';

const BASE_URL = 'api/clubs/';

@Injectable()
export class ClubService {

  constructor(private crud: CrudService) {
  }

  saveClub(club: Club): Observable<Club> {
    console.log('saveClub');
    if (club._id) {
      return this.crud.put<Club>(`${BASE_URL}${club._id}`, club);
    } else {
      return this.crud.post<Club>(BASE_URL, club);
    }
  }

  getFeaturedClub(): Observable<Club> {
    console.log('getFeaturedClub');
    // returnof(this.data[0]);
    return this.crud.unsave().get<Club>(BASE_URL + 'month/');
  }

  getClubs(): Observable<Club[]> {
    console.log('getClubs');
    return this.crud.unsave().get<Club[]>(BASE_URL);
      // .map(clubs => Observable.from(clubs)
      //   .map(club => this.mapService.enrichLocationWithCoordinate(club))
      //   .concatAll()
      //   .toArray())
      // .concatAll();
  }

  getClub(id: string): Observable<Club> {
    console.log('getClub');
    // returnof(this.data[+id]);
    return this.crud.get<Club>(`${BASE_URL}${id}`);
      // .flatMap(club => this.mapService.enrichLocationWithCoordinate(club));
  }

  deleteClub(id: string): Observable<Response> {
    console.log('deleteClub');
    // this.data = [...this.data.filter(c => c._id !== id)];
    // returnof(undefined);
    return this.crud.doDelete(`${BASE_URL}${id}`);
  }
}
