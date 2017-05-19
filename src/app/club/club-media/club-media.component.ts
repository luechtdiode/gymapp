import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gymapp-club-media',
  templateUrl: './club-media.component.html',
  styleUrls: ['./club-media.component.scss'],
})
export class ClubMediaComponent implements OnInit {

  @Input()
  club = {
    name: 'BTV Basel',
    image: '/assets/images/verein.png',
    label: 'KuTu',
    description: 'description',
  };

  constructor() { }

  ngOnInit() {
  }

}
