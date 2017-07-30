import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import * as fromSponsors from '../sponsor.actions';
import { isMemberOfSponsor, getMemberOfSponsor, getSponsorActions } from '../../app-state.reducer';
import { SponsorFormModel } from '../sponsor-form/sponsor-form.model';
import { SponsorAction, Sponsor } from '../../model/backend-typings';
import { Observable } from 'rxjs/Observable';
import { SaveAction } from '../sponsor.actions';

@Component({
  selector: 'gymapp-edit-sponsor-page',
  templateUrl: './edit-sponsor-page.component.html',
  styleUrls: ['./edit-sponsor-page.component.scss'],
})
export class EditSponsorPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  regactions: Observable<SponsorAction[]>;
  sponsor: Observable<Sponsor>;

  sponsorOrigin: Sponsor;

  constructor(public store: Store<AppState>,
              public fb: FormBuilder) {
    this.form = this.fb.group(SponsorFormModel);
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

    this.sponsor = this.store.select(getMemberOfSponsor)
                .filter(sponsor => sponsor !== undefined)
                .map(sponsor => Object.assign({sponsoractions: []}, sponsor))
                ;

    this.subscriptions.push(
      this.store.select(isMemberOfSponsor)
        .filter(id => id && id.length > 0)
        .subscribe(sponsorid => {
          this.store.dispatch(new fromSponsors.LoadAction(sponsorid));
          this.subscriptions.push(this.sponsor.subscribe(sponsor => {
            this.sponsorOrigin = sponsor;
            this.form.patchValue(sponsor);
          }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  doSave(value) {
    this.store.dispatch(new SaveAction(Object.assign({}, this.sponsorOrigin, value)));
  }
}
