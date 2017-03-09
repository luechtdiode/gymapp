import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import * as fromSponsors from '../sponsor.actions';
import { isMemberOfSponsor, getMemberOfSponsor } from '../../app-state.reducer';
import { SponsorFormModel } from '../sponsor-form/sponsor-form.model';
import { SponsorAction, Sponsor } from '../../model/backend-typings';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gymapp-edit-sponsor-page',
  templateUrl: './edit-sponsor-page.component.html',
  styleUrls: ['./edit-sponsor-page.component.scss']
})
export class EditSponsorPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  regactions: Observable<SponsorAction[]>;
  sponsor: Observable<Sponsor>; // = <Sponsor>{};

  constructor(public store: Store<AppState>,
              public fb: FormBuilder) {
    this.form = this.fb.group(SponsorFormModel);
    this.regactions = Observable.of(
    [<SponsorAction>{
      action: {
        _id: 'a1',
        name: 'TestSponsorAction',
      },
      bidperaction: 10,
      maxcnt: 100,
      kinds: [],
    },
    <SponsorAction>{
      action: {
        _id: 'a2',
        name: 'TestSponsorAction2',
      },
      bidperaction: 10,
      maxcnt: 100,
      kinds: [],
    },
    <SponsorAction>{
      action: {
        _id: 'a3',
        name: 'TestSponsorAction3',
      },
      bidperaction: 10,
      maxcnt: 100,
      kinds: [],
    }]
    )
    ;
    this.sponsor = Observable.of();
  }

  ngOnInit() {
    this.sponsor = this.store.select(getMemberOfSponsor)
                .filter(sponsor => sponsor !== undefined)
                .map(sponsor => Object.assign({sponsoractions: []}, sponsor))
                // .subscribe(sponsor => {
                //   this.sponsor = sponsor;
                //   this.form.patchValue(sponsor);
                // })
                ;

    this.subscriptions.push(
      this.store.select(isMemberOfSponsor)
        .filter(id => id && id.length > 0)
        .subscribe(sponsorid => {
          this.store.dispatch(fromSponsors.loadAction(sponsorid));
          this.subscriptions.push(this.sponsor.subscribe(sponsor => {
            this.form.patchValue(sponsor);
          }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  doSave(value) {
    console.log(value);
  }
}