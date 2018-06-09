import { Component, OnInit, Input } from '@angular/core';
import { AbstractListComponent } from '../../shared/abstract-list.component';
import { Observable } from 'rxjs';
import { Competition, Sponsor, SponsorAction, CompSponsorAction, Club } from '../../model/backend-typings';
import * as fromRoot from '../../app-state.reducer';
import * as fromCompetitions from '../competition.actions';
import { Store, combineReducers } from '@ngrx/store';
import { AppState, isMemberOfClub } from '../../app-state.reducer';
import { RouterPath } from '../../router-path';
import { Router } from '@angular/router';

@Component({
  selector: 'gymapp-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss'],
})
export class CompetitionListComponent extends AbstractListComponent<Competition> implements OnInit {
  isCompetitionsloading: Observable<boolean>;
  message = 'Competitions loading ...';
  private _supportingSponsor: Sponsor;
  private _supportingClub: Club;
  private _isMemberOfClub: string;

  constructor(protected store: Store<AppState>
  , private router: Router) {
    super(store);
  }

  ngOnInit() {
    this.store.dispatch(new fromCompetitions.LoadAllAction());
    this.isCompetitionsloading = this.store.select(fromRoot.isLoadingCompetitions);
    this.store.select(isMemberOfClub).subscribe(moc => this._isMemberOfClub = moc);
    const maxTabs = 6;
    this.addExtraFilter((competition) => this.filterMatchingActions(competition));
    this.connect(fromRoot.getCompetitions, maxTabs, (competition: Competition) => [competition.kind]);
  }

  @Input()
  public set supportingSponsor(sponsor: Sponsor) {
    this._supportingSponsor = sponsor;
    this.reconnect();
  }

  public get supportingSponsor(): Sponsor {
    return this._supportingSponsor;
  }

  @Input()
  public set supportingClub(club: Club) {
    this._supportingClub = club;
    this.reconnect();
  }

  public get supportingClub(): Club {
    return this._supportingClub;
  }

  isEditable(competition: Competition): boolean {
    return  this._isMemberOfClub && competition.clubid && competition.clubid._id === this._isMemberOfClub;
  }

  onEdit(competition: Competition) {
    this.router.navigate([RouterPath.COMPETITION_EDIT.replace(':competitionid', competition._id)]);
  }

  onDelete(competition: Competition) {
    this.store.dispatch(new fromCompetitions.DeleteAction(competition));
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

  filterMatchingActions(competition: Competition): boolean {
    if (this._supportingClub) {
      if (!competition.clubid || this._supportingClub._id !== competition.clubid._id) {
        return false;
      }
    }
    if (this.supportingSponsor) {
      const sponsorActions = this.supportingSponsor.sponsoractions;
      const competitionActions = competition.sponsoractions;
      return sponsorActions.find(sa => competitionActions.find(ca => {
        if (this.isActionPairMatching(sa, ca)) {
          if (this.isKindMatching(sa, competition)) {
            return true;
          }
        }
        return false;
      }) !== undefined) !== undefined;
    }
    return true;
  }

}
