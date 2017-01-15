import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

@Injectable()
export class CachedCrudService {

  private static responseCache: { [key: string]: Response; } = {};

  constructor(private http: Http) {
  }

  public get(url: string): Observable<Response> {
    const cached: Response = CachedCrudService.responseCache[url];
    if (cached) {
      return Observable.of(cached);
    }
    return this.http.get(url)
      .filter(response => response.status === 200)
      .map(response => {
        CachedCrudService.responseCache[url] = response;
        return response;
      });
  }
}
