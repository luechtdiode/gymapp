import { OnInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Competition, CompSponsorAction, Club } from '../../model/backend-typings';
import { Store } from '@ngrx/store';
import { AppState, getSponsorActions, isMemberOfClub, getMemberOfClub, getDetailClub } from '../../app-state.reducer';
import { CompetitionFormModel } from '../competition-form/competition-form.model';
import { createAction } from '../competition.actions';
import { CompetitionFormComponent } from '../competition-form/competition-form.component';
import { loadDetailAction } from '../../club/club.actions';
import { RouterPath } from '../../app.routing';


@Component({
  selector: 'gymapp-create-competition-page',
  templateUrl: './create-competition-page.component.html',
  styleUrls: ['./create-competition-page.component.scss'],
})
export class CreateCompetitionPageComponent implements OnInit {

  form: FormGroup;
  regactions: Observable<CompSponsorAction[]>;
  competition = <Competition>{
    sponsoractions: [],
    dates: [],
  };
  competitionsLink = '/' + RouterPath.COMPETITIONS;

  clubid: string;
  club: Club;

  @ViewChild(CompetitionFormComponent)
  private formComponent: CompetitionFormComponent;

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.form = this.fb.group(CompetitionFormModel);
  }

  ngOnInit() {
    this.store.select(isMemberOfClub).subscribe(moc => {
      this.clubid = moc;
      this.store.dispatch(loadDetailAction(moc));
    });
    this.store.select(getDetailClub).subscribe(club => this.club = club);
    this.regactions = this.store.select(getSponsorActions)
    .map(a =>
      a.map(aa => <CompSponsorAction>{
        action: aa,
        costperaction: '10.00',
        maxcnt: 100,
    }));
  }

  doSave() {
    const toSave =
      Object.assign({
          club: this.club.name,
          clubid: this.clubid,
        },
        this.formComponent.getEditedCompetition(),
      );
    console.log('submit', toSave);
    this.store.dispatch(createAction(toSave));
  }
}
