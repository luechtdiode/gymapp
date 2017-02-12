import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getSponsors } from '../../app-state.reducer';
import { AbstractListComponent } from '../../shared/abstract-list.component';
import { Sponsor } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromSponsor from '../sponsor.actions';
import { flatMap } from '../../shared/collection-util';

@Component({
  selector: 'gymapp-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss']
})
export class SponsorListComponent extends AbstractListComponent<Sponsor> implements OnInit {
  isSponsorsloading: Observable<boolean>;
  message = 'Sponsors loading ...';

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(fromSponsor.loadAllAction());
    const maxTabs = 6;
    this.connect(fromRoot.getSponsors, maxTabs, (sponsor: Sponsor) =>
      flatMap(sponsor.sponsoractions, (actions) => actions.kinds));
    this.isSponsorsloading = this.store.select(fromRoot.isLoadingSponsors);
  }
}
