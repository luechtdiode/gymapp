import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import * as fromSponsors from '../sponsor.actions';
import { isMemberOfSponsor, getMemberOfSponsor } from '../../app-state.reducer';
import { SponsorFormModel } from '../sponsor-form/sponsor-form.model';

@Component({
  selector: 'gymapp-edit-sponsor-page',
  templateUrl: './edit-sponsor-page.component.html',
  styleUrls: ['./edit-sponsor-page.component.scss']
})
export class EditSponsorPageComponent implements OnInit, OnDestroy {

  form: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
              public fb: FormBuilder) {
    this.form = this.fb.group(SponsorFormModel);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(isMemberOfSponsor)
        .filter(id => id && id.length > 0)
        .subscribe(sponsorid => {
          this.store.dispatch(fromSponsors.loadAction(sponsorid));
          this.subscriptions.push(
            this.store.select(getMemberOfSponsor)
              .filter(sponsor => sponsor !== undefined)
              .subscribe(sponsor => {
                const toEdit = Object.assign({}, sponsor);
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
