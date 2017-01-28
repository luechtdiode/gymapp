import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Sponsor } from '../model/backend-typings';
import { CrudService } from '../shared/crud.service';
import { Response } from '@angular/http';

const BASE_URL = '/api/sponsors/';

@Injectable()
export class SponsorService {

  constructor(private crud: CrudService) {
  }

  saveSponsor(sponsor: Sponsor): Observable<Sponsor> {
    console.log('saveSponsor');
    if (sponsor._id) {
      return this.crud.put<Sponsor>(`${BASE_URL}${sponsor._id}`, sponsor);
    } else {
      return this.crud.post<Sponsor>(BASE_URL, sponsor);
    }
  }

  getFeaturedSponsor(): Observable<Sponsor> {
    console.log('getFeaturedSponsor');
    // return Observable.of(this.data[0]);
    return this.crud.unsave().get<Sponsor>(BASE_URL + 'month/');
  }

  getSponsors(): Observable<Sponsor[]> {
    console.log('getSponsors');
    return this.crud.unsave().get<Sponsor[]>(BASE_URL);
      // .map(sponsors => Observable.from(sponsors)
      //   .map(sponsor => this.mapService.enrichLocationWithCoordinate(sponsor))
      //   .concatAll()
      //   .toArray())
      // .concatAll();
  }

  getSponsor(id: string): Observable<Sponsor> {
    console.log('getSponsor');
    // return Observable.of(this.data[+id]);
    return this.crud.unsave().get<Sponsor>(`${BASE_URL}${id}`);
      // .flatMap(sponsor => this.mapService.enrichLocationWithCoordinate(sponsor));
  }

  deleteSponsor(id: string): Observable<Response> {
    console.log('deleteSponsor');
    // this.data = [...this.data.filter(c => c._id !== id)];
    // return Observable.of(undefined);
    return this.crud.doDelete(`${BASE_URL}${id}`);
  }
}
