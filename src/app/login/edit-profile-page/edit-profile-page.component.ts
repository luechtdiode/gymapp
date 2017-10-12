import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SponsorAction, Sponsor } from '../../model/backend-typings';
import { Store } from '@ngrx/store';
import { AppState, getSponsorActions, getProfile, getUser } from '../../app-state.reducer';
import { RegisterUserFormModel } from '../register-user-form/register-user-form.model';
import { SponsorFormModel } from '../../sponsor/sponsor-form/sponsor-form.model';
import { ClubFormModel } from '../../club/club-form/club-form.model';
import { Profile } from '../../shared/auth.reducer';
import { ProfileAction } from '../../shared/auth.actions';

@Component({
  selector: 'gymapp-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

  userForm: FormGroup;
  sponsorForm: FormGroup;
  clubForm: FormGroup;
  form: FormGroup;
  regactions: Observable<SponsorAction[]>;
  profile = <Profile>{};

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.userForm = this.fb.group(RegisterUserFormModel);
    this.sponsorForm = this.fb.group(SponsorFormModel);
    this.clubForm = this.fb.group(ClubFormModel);
    this.form = this.fb.group({
      user: this.userForm,
      sponsor: this.sponsorForm,
      club: this.clubForm,
    });
    this.store.dispatch(new ProfileAction());
  }

  ngOnInit() {
    this.regactions = this.store.select(getSponsorActions)
    .map(a =>
      a.map(aa => <SponsorAction>{
        action: aa,
        bidperaction: '10.00',
        maxcnt: 100,
        kinds: [],
    }));
    this.store.select(getProfile).subscribe(profile => {
      this.profile = profile;
      if (profile) {
        if (profile.user) {
          this.userForm.patchValue(profile.user);
        }
        if (profile.sponsor) {
          this.sponsorForm.patchValue(profile.sponsor);
        }
        if (profile.club) {
          this.clubForm.patchValue(profile.club);
        }
      }
    });
  }

  doSave(value) {
    // this.store.dispatch(new SaveProfileAction(value.user));
  }

}
