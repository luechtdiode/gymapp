import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Competition } from '../../model/backend-typings';
import { AppState } from '../../app-state.reducer';
import * as fromRoot from '../../app-state.reducer';

@Component({
  selector: 'gymapp-competition-media',
  templateUrl: './competition-media.component.html',
  styleUrls: ['./competition-media.component.scss']
})
export class CompetitionMediaComponent implements OnInit {

  @Input()
  competition: Competition = {
    name: 'Testwettkampf',
    image: '/images/wettkampf.png',
    kind: 'KuTu',
    description: 'testdescription',
    dates: [new Date('2017-02-15T00:00:00.0Z')],
    location: 'Basel',
    club: 'BTV Basel'
  } as Competition;

  ngOnInit() {

  }

}
