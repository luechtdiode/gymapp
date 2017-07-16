import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClubFormModel } from '../club-form/club-form.model';
import * as fromClubs from '../club.actions';
import { isMemberOfClub, getMemberOfClub } from '../../app-state.reducer';
import { Subscription } from 'rxjs/Subscription';
import { Club } from '../../model/backend-typings';
import { RouterPath } from '../../app.routing';
import { deleteAction } from "../club.actions";

@Component({
  selector: 'gymapp-edit-club-page',
  templateUrl: './edit-club-page.component.html',
  styleUrls: ['./edit-club-page.component.scss'],
})
export class EditClubPageComponent implements OnInit, OnDestroy {

  clubsLink = '/' + RouterPath.CLUBS;

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
                const toEdit = Object.assign({}, club, {kind: club.kind.join(',')});
                this.clubOrigin = toEdit;
                this.form.patchValue(toEdit);
              }),
          );
        }),
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  doSave(value) {
    this.store.dispatch(fromClubs.saveAction(Object.assign({}, this.clubOrigin, value, {kind: value.kind.split(',')})));
  }

  onDelete() {
    this.store.dispatch(deleteAction(this.clubOrigin));
  }
}
