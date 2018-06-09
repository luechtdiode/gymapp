import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs/Observable';
import { Action } from '../model/backend-typings';

const BASE_URL = 'api/actions/';

@Injectable()
export class ActionsService {

  unsaveCrud: CrudService;

  loadActions(): Observable<Action[]> {
    return this.unsaveCrud.get(BASE_URL);
  }

  constructor(private crud: CrudService) {
    this.unsaveCrud = crud.unsave();
  }

}
