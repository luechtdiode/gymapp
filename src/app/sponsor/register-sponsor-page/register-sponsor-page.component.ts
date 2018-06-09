
import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { createWithModel } from '../../login/register-user-form/register-user-form.model';
import { AppState, getSponsorActions } from '../../app-state.reducer';
import { SponsorFormModel } from '../sponsor-form/sponsor-form.model';
import { RegisterSponsorAction } from '../../shared/auth.actions';
import { SponsorAction, Sponsor } from '../../model/backend-typings';
import { Observable } from 'rxjs';

@Component({
  selector: 'gymapp-register-sponsor-page',
  templateUrl: './register-sponsor-page.component.html',
  styleUrls: ['./register-sponsor-page.component.scss'],
})
export class RegisterSponsorPageComponent implements OnInit {

  userForm: FormGroup;
  sponsorForm: FormGroup;
  form: FormGroup;
  regactions: Observable<SponsorAction[]>;
  sponsor = <Sponsor>{};

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.userForm = createWithModel(fb);
    this.sponsorForm = this.fb.group(SponsorFormModel);
    this.form = this.fb.group({
      user: this.userForm,
      sponsor: this.sponsorForm,
    });

  }

  ngOnInit() {
    this.regactions = this.store.select(getSponsorActions).pipe(
    map(a =>
      a.map(aa => <SponsorAction>{
        action: aa,
        bidperaction: '10.00',
        maxcnt: 100,
        kinds: [],
    })));
  }

  doSave(value) {
    this.store.dispatch(new RegisterSponsorAction(value.user, value.sponsor));
  }

}
