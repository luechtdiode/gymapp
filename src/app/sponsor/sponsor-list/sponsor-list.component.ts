import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getSponsors } from '../../app-state.reducer';
import { AbstractListComponent } from '../../shared/abstract-list.component';
import { Sponsor, Competition, CompSponsorAction, SponsorAction } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromSponsor from '../sponsor.actions';
import { flatMap } from '../../shared/collection-util';

@Component({
  selector: 'gymapp-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss'],
})
export class SponsorListComponent extends AbstractListComponent<Sponsor> implements OnInit {
  isSponsorsloading: Observable<boolean>;
  message = 'Sponsors loading ...';
  private _allItems: Sponsor[] = [];
  private _supportingCompetition: Competition;

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(fromSponsor.loadAllAction());
    const maxTabs = 6;
    this.connect(fromRoot.getSponsors, maxTabs, (sponsor: Sponsor) =>
      flatMap(sponsor.sponsoractions, (actions) => actions.kinds));
    this.isSponsorsloading = this.store.select(fromRoot.isLoadingSponsors);
    this.addExtraFilter((sponsor) => this.filterMatchingSponsorActions(sponsor));
  }

  @Input()
  public set supportingCompetition(competition: Competition) {
    this._supportingCompetition = competition;
    this.reevaluateExtraFilteredList();
  }

  public get supportingCompetition(): Competition {
    return this._supportingCompetition;
  }

  isActionPairMatching(ca: CompSponsorAction, sa: SponsorAction): boolean {
    return  ca.action === sa.action &&
            ca.costperaction <= sa.bidperaction &&
            ca.maxcnt >= 0 && sa.maxcnt >= 0;
  }

  isKindMatching(sa: SponsorAction): boolean {
    if (sa.kinds === undefined || sa.kinds.length === 0) {
      return true;
    } else {
      for (let k = 0; k < sa.kinds.length; k++) {
        if (sa.kinds[k] === this._supportingCompetition.kind) {
          return true;
        }
      }
    }
  }

  filterMatchingSponsorActions(sponsor: Sponsor): boolean {
    if (!this.supportingCompetition) {
      return true;
    }

    const sponsorActions = sponsor.sponsoractions;
    const competitionActions = this.supportingCompetition.sponsoractions;
    return sponsorActions.find(sa => competitionActions.find(ca => {
      if (this.isActionPairMatching(ca, sa)) {
        if (this.isKindMatching(sa)) {
          return true;
        }
      }
      return false;
    }) !== undefined) !== undefined;
  }
}
