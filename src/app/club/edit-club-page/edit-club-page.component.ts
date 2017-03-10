import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClubFormModel } from '../club-form/club-form.model';
import * as fromClubs from '../club.actions';
import { isMemberOfClub, getMemberOfClub } from '../../app-state.reducer';
import { Subscription } from 'rxjs/Subscription';
import { Club } from "../../model/backend-typings";

@Component({
  selector: 'gymapp-edit-club-page',
  templateUrl: './edit-club-page.component.html',
  styleUrls: ['./edit-club-page.component.scss']
})
export class EditClubPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  clubOrigin: Club;
  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
              public fb: FormBuilder) {
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
                this.clubOrigin = toEdit;
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
    this.store.dispatch(fromClubs.saveAction(Object.assign({}, this.clubOrigin, value)));
  }
}
