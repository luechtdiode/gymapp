import { Component, OnInit, Input } from '@angular/core';
import { CompetitionActionModel } from '../competition-action-form/competition-action-form.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SelectionChangedEvent } from '../../shared/util';
import { CompSponsorAction, Competition } from '../../model/backend-typings';
import { RouterPath } from '../../router-path';

@Component({
  selector: 'gymapp-competition-form',
  templateUrl: './competition-form.component.html',
  styleUrls: ['./competition-form.component.scss'],
})
export class CompetitionFormComponent implements OnInit {
  private _form: FormGroup;
  private _competition: Competition;
  private _regactions: CompSponsorAction[];

  public competitionsLink = '/' + RouterPath.COMPETITIONS;
  public allActions: CompSponsorAction[];
  public budget: number;

  @Input()
  set form(form: FormGroup) {
    this._form = form;
    this.syncCompSponsorActions();
  }
  get form(): FormGroup {
    return this._form;
  }

  @Input()
  set regactions(regactions: CompSponsorAction[]) {
    this._regactions = regactions.map(a => Object.assign({}, a));
    if (this._competition) {
      this._competition.sponsoractions = this._competition.sponsoractions
        .map(a => this.materializeAction(a, this._regactions));
    }
    this.syncCompSponsorActions();
  }

  get regactions(): CompSponsorAction[] {
    return this._regactions;
  }

  @Input()
  set competition(competition: Competition) {
    this._competition = Object.assign({sponsoractions: [], dates: ['', '']}, competition);
    if (this._regactions) {
      this._competition.sponsoractions = this._competition.sponsoractions
        .map(a => this.materializeAction(a, this._regactions));
    }
    this._form.patchValue(this._competition);
    this.syncCompSponsorActions();
  }

  get competition(): Competition {
    return this._competition;
  }

  get date1(): Date | string {
    return this.toDayString([... this._competition.dates, '', ''][0]);
  }

  get date2(): Date | string {
    return this.toDayString([... this._competition.dates, '', ''][1]);
  }

  toDayString(date: Date | string): string {
    if (date === '') {
      return date;
    }
    if (date === undefined) {
      return '';
    }
    if (typeof date === 'string') {
      return new Date(Date.parse(date)).toISOString().substr(0, 10);
    } else {
      return date.toISOString().substr(0, 10);
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {}

  getEditedCompetition(): Competition {
    const dates = [this._form.value.date1, this._form.value.date2]
      .filter(d => d !== undefined && d !== '')
      .map(d => new Date(Date.parse(d + '')));

    const comp = Object.assign(
      {},
      this._competition,
      this._form.value,
      {dates: dates});

    delete comp.date1;
    delete comp.date2;

    return comp;
  }

  recalculateBudget() {
    const calc = (action: CompSponsorAction) => {
      if (!action.costperaction) {
        return 0.00;
      } else if (typeof action.costperaction === 'number') {
        return action.costperaction / 100 * action.maxcnt;
      } else {
        return parseFloat(action.costperaction) * action.maxcnt;
      }
    };
    const reducer = (a: number, b: number) => a + b;
    this.budget = this._competition.sponsoractions.map(calc).reduce(reducer, 0.0);
  }

  syncCompSponsorActions(): void {
    if (this._regactions) {
      this.allActions = [...this._regactions];
    }
    if (this._competition && this.allActions && this._regactions) {
      this._competition.sponsoractions.forEach(action => this.replaceOrAddAction(action));
      this.sortActions();
    }
    if (this._form && this._competition) {
      this._form.controls['date1'].patchValue(this.date1);
      this._form.controls['date2'].patchValue(this.date2);
    }
  }

  sortActions(): void {
    this.allActions.sort((a, b) => {
      return a.action.name.localeCompare(b.action.name);
    });
  }

  materializeAction(action: CompSponsorAction, regactions: CompSponsorAction[]): CompSponsorAction {
    if (!action.action.name && regactions) {
      action = Object.assign({}, action, {
        action: regactions.find(a => this.areActionIdsEqual(a, action)).action,
      });
      // normalize mongoose curreny Type if needed
      if (typeof action.costperaction === 'number') {
        action.costperaction = (action.costperaction / 100).toFixed(2);
      }
    }
    return action;
  }

  replaceOrAddAction(action: CompSponsorAction): void {
    this._competition.sponsoractions = [
      ...this._competition.sponsoractions.filter(a => !this.areActionIdsEqual(a, action)),
      action];
    this.allActions = [
      ...this.allActions.filter(a => !this.areActionIdsEqual(a, action)),
      action];
    this.sortActions();
    this.recalculateBudget();
  }

  updateAction(action: CompSponsorAction): void {
    this._competition.sponsoractions.filter(a => this.areActionIdsEqual(a, action)).forEach(toHold => {
      toHold.costperaction = action.costperaction;
      toHold.maxcnt = action.maxcnt;
    });
    this.recalculateBudget();
  }

  removeAction(action: CompSponsorAction) {
    this._competition.sponsoractions = [
      ...this._competition.sponsoractions.filter(a => !this.areActionIdsEqual(a, action))];
    this.recalculateBudget();
  }

  areActionIdsEqual(a: CompSponsorAction, b: CompSponsorAction) {
    return a.action._id === b.action._id
        || a.action === b.action._id
        || a.action._id === b.action;
  }

  isActionSelected(action: CompSponsorAction): boolean {
    if (!this._competition) {
      return false;
    }
    return this._competition.sponsoractions
           .filter(a => this.areActionIdsEqual(a, action))
           .length === 1;
  }

  onCompSponsorActionChaned(action: CompSponsorAction): void {
    this.updateAction(action);
    this.updateFormGroupActions();
  }

  onCompSponsorActionSelected(event: SelectionChangedEvent<CompSponsorAction>): void {
    if (event.selected) {
      this.replaceOrAddAction(event.origin);
    } else {
      this.removeAction(event.origin);
    }
    this.updateFormGroupActions();
  }

  updateFormGroupActions() {
    if (!this._form.controls['sponsoractions']
    || (this._form.controls['sponsoractions'] as FormArray).length !== this._competition.sponsoractions.length) {
      const actionFormGroupArray = new FormArray(
        this._competition.sponsoractions
        .map(a => this.fb.group(CompetitionActionModel)),
      );
      this._form.controls['sponsoractions'] = actionFormGroupArray;
    }
    this._form.patchValue({sponsoractions: this._competition.sponsoractions});
  }
}
