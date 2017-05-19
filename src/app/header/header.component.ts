import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import { logoutAction, elevateAction } from '../shared/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RouterPath } from '../app.routing';
import { UrlProvider } from '../shared/urlProvider';

@Component({
  selector: 'gymapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn: Observable<boolean>;
  clubid: Observable<string>;
  sponsorid: Observable<string>;
  username: Observable<string>;
  subscriptions: Subscription[] = [];
  backUrl: string = undefined;

  homeLink = '/' + RouterPath.HOME;
  aboutLink = '/' + RouterPath.ABOUT;
  competitionsLink = '/' + RouterPath.COMPETITIONS;
  createCompetitionLink = '/' + RouterPath.CREATE_COMPETITION;
  clubsLink = '/' + RouterPath.CLUBS;
  sponsorsLink = '/' + RouterPath.SPONSORS;
  contactLink = '/' + RouterPath.CONTACT;
  editClubProfileLink = '/' + RouterPath.CLUBPROFILE;
  editSponsorProfileLink = '/' + RouterPath.SPONSORPROFILE;
  registerClubLink = '/' + RouterPath.REGISTER_CLUB;
  registerSponsorLink = '/' + RouterPath.REGISTER_SPONSOR;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private location: UrlProvider) { }

  activeLocation() {
    return this.location.activeLocation();
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(fromRoot.activeRoute).subscribe((rt) => {
      this.backUrl = rt.path !== '/' + RouterPath.LOGIN ? rt.path : this.backUrl;
    } ));
    this.clubid = this.store.select(fromRoot.isMemberOfClub);
    this.sponsorid = this.store.select(fromRoot.isMemberOfSponsor);
    this.loggedIn = this.store.select(fromRoot.isLoggedIn);
    this.username = this.store.select(fromRoot.getUsername);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  logIn() {
    this.store.dispatch(elevateAction(this.backUrl + ''));
  }

  logOut() {
    this.store.dispatch(logoutAction());
  }

}
