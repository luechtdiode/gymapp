import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Club } from '../../model/backend-typings';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClubFormModel } from '../club-form/club-form.model';
import * as fromClubs from '../club.actions';
import { isMemberOfClub, getMemberOfClub } from '../../app-state.reducer';
import { Subscription } from 'rxjs/Subscription';
import { loadAction } from '../../sponsor/sponsor.actions';

@Component({
  selector: 'gymapp-edit-club-page',
  templateUrl: './edit-club-page.component.html',
  styleUrls: ['./edit-club-page.component.scss']
})
export class EditClubPageComponent implements OnInit, OnDestroy {

  form: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(protected store: Store<AppState>,
    private fb: FormBuilder) {
    this.form = this.fb.group(ClubFormModel);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(isMemberOfClub)
        .filter(id => id && id.length > 0)
        .subscribe(clubid => {
          this.store.dispatch(fromClubs.loadAction(clubid));
          this.subscriptions.push(
            this.store.select(getMemberOfClub)
              .filter(club => club !== undefined)
              .subscribe(club => {
                const toEdit = Object.assign({}, club);
                /*{
                _id: '5895bda1054a8313ec424077',
                createdAt: '2017-02-04T11:40:17.168Z',
                description: 'newclub description',
                facebookhandle: '',
                googleplushandle: '',
                image: 'images/verein-flag.png',
                kind: ['test'],
                label: 'GeTu',
                name: 'newclub',
                twitterhandle: '',
                updatedAt: '2017-02-04T11:40:17.168Z',
                youtubehandle: '',
                }*/
                this.form.patchValue(toEdit);
              })
          );
        })
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  doSave(value) {
    console.log(value);
  }
}
