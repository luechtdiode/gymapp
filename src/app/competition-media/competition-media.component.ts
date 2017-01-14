import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gymapp-competition-media',
  templateUrl: './competition-media.component.html',
  styleUrls: ['./competition-media.component.scss']
})
export class CompetitionMediaComponent implements OnInit {

  competition = {
    name: 'Testwettkampf', 
    image: '/assets/images/wettkampf.png',
    kind: 'KuTu',
    description: 'testdescription',
    dates: ['2017-02-15T00:00:00.0Z'],
    location: 'Basel',
    club: 'BTV Basel'
  };

  constructor() { }

  ngOnInit() {
  }

}
