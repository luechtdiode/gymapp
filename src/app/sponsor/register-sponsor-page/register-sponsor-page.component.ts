import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterUserFormModel } from '../../login/register-user-form/register-user-form.model';
import { AppState } from '../../app-state.reducer';
import { SponsorFormModel } from '../sponsor-form/sponsor-form.model';
import { registerSponsorAction } from '../../shared/auth.actions';
import { SponsorAction, Sponsor } from '../../model/backend-typings';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gymapp-register-sponsor-page',
  templateUrl: './register-sponsor-page.component.html',
  styleUrls: ['./register-sponsor-page.component.scss']
})
export class RegisterSponsorPageComponent implements OnInit {

  userForm: FormGroup;
  sponsorForm: FormGroup;

  form: FormGroup;
  
  regactions: Observable<SponsorAction[]>;

  sponsor = <Sponsor>{};

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.userForm = this.fb.group(RegisterUserFormModel);
    this.sponsorForm = this.fb.group(SponsorFormModel);
    this.form = this.fb.group({
      user: this.userForm,
      sponsor: this.sponsorForm,
    });
    this.regactions = Observable.of([<SponsorAction>{
      action: {
        _id: 'a1',
        name: 'TestSponsorAction',
      },
      bidperaction: 10,
      maxcnt: 100,
      kinds: [],
    },
    <SponsorAction>{
      action: {
        _id: 'a2',
        name: 'TestSponsorAction2',
      },
      bidperaction: 10,
      maxcnt: 100,
      kinds: [],
    },
    <SponsorAction>{
      action: {
        _id: 'a3',
        name: 'TestSponsorAction3',
      },
      bidperaction: 10,
      maxcnt: 100,
      kinds: [],
    }]);
  }

  ngOnInit() {

  }

  doSave(value) {
    this.store.dispatch(registerSponsorAction(value.user, value.sponsor));
  }

}
