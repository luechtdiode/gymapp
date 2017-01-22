import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, isMemberOfSponsor } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';
import { Observable } from 'rxjs/Observable';
import { logoutAction } from '../shared/auth.actions';

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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.clubid = this.store.select(fromRoot.isMemberOfClub);
    this.sponsorid = this.store.select(fromRoot.isMemberOfSponsor);
    this.loggedIn = this.store.select(fromRoot.isLoggedIn);
    this.username = this.store.select(fromRoot.getUsername);
  }

  logOut() {
    this.store.dispatch(logoutAction());
  }

}
