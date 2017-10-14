import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SponsorAction, Sponsor, User } from '../../model/backend-typings';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../shared/auth.actions';
import { AppState, getSponsorActions, getProfile, getUser } from '../../app-state.reducer';
import { createWithModel } from '../register-user-form/register-user-form.model';
import { SponsorFormModel } from '../../sponsor/sponsor-form/sponsor-form.model';
import { ClubFormModel } from '../../club/club-form/club-form.model';
import { Profile } from '../../shared/auth.reducer';
import { ProfileAction } from '../../shared/auth.actions';
import { RouterPath } from '../../router-path';

@Component({
  selector: 'gymapp-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  home = '/' + RouterPath.HOME;
  userForm: FormGroup;
  user: User = {};
  profile = <Profile>{
    user: this.user,
  };
  socialConnections = [
    {key: 'facebook', name: 'Facebook', iconClass: 'fa fa-facebook', buttonClass: 'btn-facebook'},
    {key: 'twitter', name: 'Twitter', iconClass: 'fa fa-twitter', buttonClass: 'btn-twitter'},
    {key: 'google', name: 'Google +', iconClass: 'fa fa-google-plus', buttonClass: 'btn-google-plus'},
    {key: 'linkedin', name: 'LinkedIn', iconClass: 'fa fa-linkedin', buttonClass: 'btn-linkedin'},
    {key: 'instagram', name: 'Instagram', iconClass: 'fa fa-instagram', buttonClass: 'btn-instagram'},
  ];

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.userForm = createWithModel(fb, false);
    this.store.dispatch(new ProfileAction());
  }

  ngOnInit() {
    this.store.select(getUser).subscribe(user => this.user = user);

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
    this.store.dispatch(new fromAuth.SaveProfileAction(value));
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
