import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gymapp-sponsor-media',
  templateUrl: './sponsor-media.component.html',
  styleUrls: ['./sponsor-media.component.scss']
})
export class SponsorMediaComponent implements OnInit {

  sponsor = {
    name: 'Sponsorname',
    image: '/assets/images/sponsor.png',
    label: 'label',
    slogan: 'Slogan of sponsor',
    homepage: 'https://www.sponsor.com'
  };

  constructor() { }

  ngOnInit() {
  }

}
