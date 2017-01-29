import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import { logoutAction, elevateAction } from '../shared/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'gymapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: Observable<boolean>;
  clubid: Observable<string>;
  sponsorid: Observable<string>;
  username: Observable<string>;
  subscriptions: Subscription[] = [];
  backUrl: string = undefined;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.store.select(fromRoot.activeRoute).subscribe((rt) => {
      this.backUrl = rt.path !== '/login' ? rt.path : this.backUrl;
    } ));
    this.clubid = this.store.select(fromRoot.isMemberOfClub);
    this.sponsorid = this.store.select(fromRoot.isMemberOfSponsor);
    this.loggedIn = this.store.select(fromRoot.isLoggedIn);
    this.username = this.store.select(fromRoot.getUsername);
  }

  logIn() {
    this.store.dispatch(elevateAction(this.backUrl + ''));
  }

  logOut() {
    this.store.dispatch(logoutAction());
  }

}
