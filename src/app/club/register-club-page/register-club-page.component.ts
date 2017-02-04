import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { ClubFormModel } from '../club-form/club-form.model';
import { RegisterUserFormModel } from '../../login/register-user-form/register-user-form.model';
import { registerClubAction } from '../../shared/auth.actions';

@Component({
  selector: 'gymapp-register-club-page',
  templateUrl: './register-club-page.component.html',
  styleUrls: ['./register-club-page.component.scss']
})
export class RegisterClubPageComponent implements OnInit {

  user: FormGroup;
  clubdetails: FormGroup;

  form: FormGroup;

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.user = this.fb.group(RegisterUserFormModel);
    this.clubdetails = this.fb.group(ClubFormModel);
    this.form = this.fb.group({
      user: this.user,
      clubdetails: this.clubdetails,
    });
  }

  ngOnInit() {

  }

  doSave(value) {
    console.log(value);
    this.store.dispatch(registerClubAction(value.user, value.clubdetails));
  }

}