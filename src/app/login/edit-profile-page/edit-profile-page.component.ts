import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SponsorAction, Sponsor } from '../../model/backend-typings';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../shared/auth.actions';
import { AppState, getSponsorActions, getProfile, getUser } from '../../app-state.reducer';
import { RegisterUserFormModel } from '../register-user-form/register-user-form.model';
import { SponsorFormModel } from '../../sponsor/sponsor-form/sponsor-form.model';
import { ClubFormModel } from '../../club/club-form/club-form.model';
import { Profile } from '../../shared/auth.reducer';
import { ProfileAction } from '../../shared/auth.actions';

@Component({
  selector: 'gymapp-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {

  userForm: FormGroup;
  profile = <Profile>{};
  socialConnections = [
    {key: 'facebook', name: 'Facebook', iconClass: 'fa fa-facebook', buttonClass: 'btn-facebook'},
    {key: 'twitter', name: 'Twitter', iconClass: 'fa fa-twitter', buttonClass: 'btn-twitter'},
    {key: 'google', name: 'Google +', iconClass: 'fa fa-google-plus', buttonClass: 'btn-google-plus'},
    {key: 'linkedin', name: 'LinkedIn', iconClass: 'fa fa-linkedin', buttonClass: 'btn-linkedin'},
    {key: 'instagram', name: 'Instagram', iconClass: 'fa fa-instagram', buttonClass: 'btn-instagram'},
  ];

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.userForm = this.fb.group(RegisterUserFormModel);
    this.store.dispatch(new ProfileAction());
  }

  ngOnInit() {

    this.store.select(getProfile).subscribe(profile => {
      this.profile = profile;
      if (profile) {
        if (profile.user) {
          this.userForm.patchValue(profile.user);
        }
      }
    });
  }

  doSave(value) {
    // this.store.dispatch(new SaveProfileAction(value.user));
  }

  onConnectToSocialAccount(provider: string) {
    this.store.dispatch(new fromAuth.ConnectToSocialProviderAction(provider));
  }
  onDisconnectFromSocialAccount(provider: string) {
    this.store.dispatch(new fromAuth.DisconnectFromSocialProviderAction(this.profile.user, provider));
  }
  onDelete() {
    // this.store.dispatch(new fromClubs.DeleteAction(this.clubOrigin));
  }
}
