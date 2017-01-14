import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gymapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showCompetition = true;
  competitionmessage: string;
  showClub = true;
  clubmessage: string;
  showSponsor = true;
  sponsormessage: string;

  constructor() { }

  ngOnInit() {
  }

}
