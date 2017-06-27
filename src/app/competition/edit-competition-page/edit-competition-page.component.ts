import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState, getSponsorActions } from '../../app-state.reducer';
import { CompetitionFormModel } from '../competition-form/competition-form.model';
import { CompSponsorAction, Competition } from '../../model/backend-typings';
import { saveAction } from '../competition.actions';
import { Observable } from 'rxjs/Observable';
import { CompetitionFormComponent } from '../competition-form/competition-form.component';

@Component({
  selector: 'gymapp-edit-competition-page',
  templateUrl: './edit-competition-page.component.html',
  styleUrls: ['./edit-competition-page.component.scss'],
})
export class EditCompetitionPageComponent implements OnInit {
  form: FormGroup;
  regactions: Observable<CompSponsorAction[]>;
  competition = <Competition>{
    sponsoractions: [],
    dates: [],
  };

  @ViewChild(CompetitionFormComponent)
  private formComponent: CompetitionFormComponent;

 constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.form = this.fb.group(CompetitionFormModel);
  }

  ngOnInit() {
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
      Object.assign({},
        this.formComponent.getEditedCompetition(),
      );
    console.log('submit', toSave);
    this.store.dispatch(saveAction(toSave));
  }
}
