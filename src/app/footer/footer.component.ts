import { Component, OnInit } from '@angular/core';
import { RouterPath } from '../app.routing';
import { UrlProvider } from '../shared/urlProvider';

@Component({
  selector: 'gymapp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  baseRef;
  homeLink = RouterPath.HOME;
  aboutLink = RouterPath.ABOUT;
  competitionsLink = RouterPath.COMPETITIONS;
  clubsLink = RouterPath.CLUBS;
  sponsorsLink = RouterPath.SPONSORS;
  contactLink = RouterPath.CONTACT;
  editClubProfileLink = RouterPath.CLUBPROFILE;
  editSponsorProfileLink = RouterPath.SPONSORPROFILE;

  constructor(private urlProvider: UrlProvider) {
    this.baseRef = urlProvider.originHRef;
  }

  ngOnInit() {
  }

  getYear() {
    return new Date().getUTCFullYear();
  }
}
