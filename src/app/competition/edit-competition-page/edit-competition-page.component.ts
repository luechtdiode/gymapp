import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState, getSponsorActions, getCompetition } from '../../app-state.reducer';
import { CompetitionFormModel } from '../competition-form/competition-form.model';
import { CompSponsorAction, Competition } from '../../model/backend-typings';
import { Observable } from 'rxjs/Observable';
import { CompetitionFormComponent } from '../competition-form/competition-form.component';
import { Router, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RouterPath } from '../../app.routing';
import { SaveAction, LoadAction } from '../competition.actions';

@Component({
  selector: 'gymapp-edit-competition-page',
  templateUrl: './edit-competition-page.component.html',
  styleUrls: ['./edit-competition-page.component.scss'],
})
export class EditCompetitionPageComponent implements OnInit {
  form: FormGroup;
  regactions: Observable<CompSponsorAction[]>;
  competitionsLink = '/' + RouterPath.COMPETITIONS;
  competition = Observable.of(<Competition>{
    sponsoractions: [],
    dates: [],
  });

  @ViewChild(CompetitionFormComponent)
  private formComponent: CompetitionFormComponent;

 constructor( router: Router,
              fb: FormBuilder,
              public store: Store<AppState>) {

    this.form = fb.group(CompetitionFormModel);
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    const competitionid = root.firstChild.paramMap.get('competitionid');
    store.dispatch(new LoadAction(competitionid));
    this.competition = store.select(getCompetition);
  }

  ngOnInit() {
    this.regactions = this.store.select(getSponsorActions)
    .map(a =>
      a.map(aa => <CompSponsorAction>{
        action: aa,
        costperaction: '10.00',
        maxcnt: 100,
    }));

    // this.competition.filter(c => c !== undefined).subscribe(competition => {
    //   this.form.patchValue(competition);
    // });
  }

  doSave() {
    const toSave =
      Object.assign({},
        this.formComponent.getEditedCompetition(),
      );
    console.log('submit', toSave);
    this.store.dispatch(new SaveAction(toSave));
  }
}
