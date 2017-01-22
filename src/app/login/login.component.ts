import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { loginAction } from '../shared/auth.actions';
import { User } from '../model/backend-typings';
import { AppState } from '../app-state.reducer';
import * as fromRoot from '../app-state.reducer';

@Component({
  selector: 'gymapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  } as User;

  rememberMe: boolean = false;

  backUrl: string = undefined;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(fromRoot.getBackUrl).subscribe(url => this.backUrl = url);
  }

  doLogin() {
    this.store.dispatch(loginAction(this.rememberMe, this.user, this.backUrl));
  }
}
