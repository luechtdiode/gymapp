import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sponsor } from '../../model/backend-typings';

@Component({
  selector: 'gymapp-sponsor-media',
  templateUrl: './sponsor-media.component.html',
  styleUrls: ['./sponsor-media.component.scss'],
})
export class SponsorMediaComponent implements OnInit {

  @Input()
  sponsor: Sponsor = {
    name: 'Sponsorname',
    image: '/assets/images/sponsor.png',
    slogan: 'Slogan of sponsor',
    homepage: 'https://www.sponsor.com',
  };

  @Input()
  editable = false;

  @Output()
  onDelete = new EventEmitter<string>();


  @Output()
  onEdit = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
