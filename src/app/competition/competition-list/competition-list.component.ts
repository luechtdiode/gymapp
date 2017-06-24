import { Component, OnInit, Input } from '@angular/core';
import { AbstractListComponent } from '../../shared/abstract-list.component';
import { Observable } from 'rxjs/Observable';
import { Competition, Sponsor, SponsorAction, CompSponsorAction } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromCompetitions from '../competition.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';

@Component({
  selector: 'gymapp-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss'],
})
export class CompetitionListComponent extends AbstractListComponent<Competition> implements OnInit {
  isClubloading: Observable<boolean>;
  message = 'Competitions loading ...';
  private _supportingSponsor: Sponsor;

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(fromCompetitions.loadAllAction());
    const maxTabs = 6;
    this.connect(fromRoot.getCompetitions, maxTabs, (competition: Competition) => [competition.kind]);
    this.isClubloading = this.store.select(fromRoot.isLoadingClub);
    this.addExtraFilter((competition) => this.filterMatchinSponsorActions(competition));
  }

  @Input()
  public set supportingSponsor(sponsor: Sponsor) {
    this._supportingSponsor = sponsor;
    this.reevaluateExtraFilteredList();
  }

  public get supportingSponsor(): Sponsor {
    return this._supportingSponsor;
  }

  isActionPairMatching(sa: SponsorAction, ca: CompSponsorAction): boolean {
    return  ca.action === sa.action &&
            ca.costperaction <= sa.bidperaction &&
            ca.maxcnt >= 0 && sa.maxcnt >= 0;
  }

  isKindMatching(sa: SponsorAction, ca: Competition): boolean {
    if (sa.kinds === undefined || sa.kinds.length === 0) {
      return true;
    } else {
      for (let k = 0; k < sa.kinds.length; k++) {
        if (sa.kinds[k] === ca.kind) {
          return true;
        }
      }
    }
  }

  filterMatchinSponsorActions(competition: Competition): boolean {
    if (!this.supportingSponsor) {
      return true;
    }
    const sponsorActions = this.supportingSponsor.sponsoractions;
    const competitionActions = competition.sponsoractions;
    return sponsorActions.find(sa => competitionActions.find(ca => {
      console.log(sa.action.name, ca.action.name);
      if (this.isActionPairMatching(sa, ca)) {
        if (this.isKindMatching(sa, competition)) {
          return true;
        }
      }
      return false;
    }) !== undefined) !== undefined;
  }

}
