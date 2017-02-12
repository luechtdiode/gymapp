import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Competition } from '../../model/backend-typings';

@Component({
  selector: 'gymapp-competition-media',
  templateUrl: './competition-media.component.html',
  styleUrls: ['./competition-media.component.scss'],
})
export class CompetitionMediaComponent {

  @Input()
  competition: Competition = <Competition>{
    name: 'Testwettkampf',
    image: '/images/wettkampf.png',
    kind: 'KuTu',
    description: 'testdescription',
    dates: [new Date('2017-02-15T00:00:00.0Z')],
    location: 'Basel',
    club: 'BTV Basel',
  };

  @Input()
  editable = false;

  @Output()
  onDelete = new EventEmitter<string>();


  @Output()
  onEdit = new EventEmitter<string>();
}
