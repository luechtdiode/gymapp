import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterUserFormModel } from '../../login/register-user-form/register-user-form.model';
import { AppState } from '../../app-state.reducer';
import { SponsorFormModel } from '../sponsor-form/sponsor-form.model';

@Component({
  selector: 'gymapp-register-sponsor-page',
  templateUrl: './register-sponsor-page.component.html',
  styleUrls: ['./register-sponsor-page.component.scss']
})
export class RegisterSponsorPageComponent implements OnInit {

  user: FormGroup;
  sponsordetails: FormGroup;

  form: FormGroup;

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.user = this.fb.group(RegisterUserFormModel);
    this.sponsordetails = this.fb.group(SponsorFormModel);
    this.form = this.fb.group({
      user: this.user,
      sponsordetails: this.sponsordetails,
    });
  }

  ngOnInit() {

  }

  doSave(value) {
    console.log(value);
    this.store.dispatch(registerSponsorAction(value.user, value.sponsordetails));
  }

}