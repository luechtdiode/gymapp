import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Sponsor, SponsorAction } from '../../model/backend-typings';
import { RouterPath } from '../../app.routing';
import { SelectionChangedEvent } from '../../shared/util';
import { SponsorActionModel } from '../sponsor-action-form/sponsor-action-form.model';

@Component({
  selector: 'gymapp-sponsor-form',
  templateUrl: './sponsor-form.component.html',
  styleUrls: ['./sponsor-form.component.scss']
})
export class SponsorFormComponent implements OnInit {
  private _sponsor: Sponsor;
  private _regactions: SponsorAction[];

  public sponsorsLink = '/' + RouterPath.SPONSORS;
  public allActions: SponsorAction[];
  public budget: number;

  @Input()
  set regactions(regactions: SponsorAction[]) {
    this._regactions = regactions.map(a => Object.assign({}, a));
    if (this._sponsor) {
      this._sponsor.sponsoractions = this._sponsor.sponsoractions
        .map(a => this.materializeAction(a, this._regactions));
    }
    this.syncSponsorActions();
  }

  get regactions(): SponsorAction[] {
    return this._regactions;
  }

  @Input()
  set sponsor(sponsor: Sponsor) {
    this._sponsor = Object.assign({sponsoractions: []}, sponsor);
    if (this._regactions) {
      this._sponsor.sponsoractions = this._sponsor.sponsoractions
        .map(a => this.materializeAction(a, this._regactions));
    }
    this.syncSponsorActions();
  }

  get sponsor(): Sponsor {
    return this._sponsor;
  }

  @Input()
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  recalculateBudget() {
    const calc = (action: SponsorAction) => {
      if (!action.bidperaction) {
        return 0.00;
      } else if (typeof action.bidperaction === 'number') {
        return action.bidperaction / 100 * action.maxcnt;
      } else {
        return parseFloat(action.bidperaction) * action.maxcnt;
      }
    };
    const reducer = (a: number, b: number) => a + b;
    this.budget = this._sponsor.sponsoractions.map(calc).reduce(reducer, 0.0);
  }

  syncSponsorActions(): void {
    if (this._regactions) {
      this.allActions = [...this._regactions];
    }
    if (this._sponsor && this.allActions && this._regactions) {
      this._sponsor.sponsoractions.forEach(action => this.replaceOrAddAction(action));
      this.sortActions();
    }
  }

  sortActions(): void {
    this.allActions.sort((a, b) => {
      return a.action.name.localeCompare(b.action.name);
    });
  }

  materializeAction(action: SponsorAction, regactions: SponsorAction[]): SponsorAction {
    if (!action.action.name && regactions) {
      action = Object.assign({}, action, {
        action: regactions.find(a => this.areActionIdsEqual(a, action)).action,
      });
      // normalize mongoose curreny Type if needed
      if (typeof action.bidperaction === 'number') {
        action.bidperaction = (action.bidperaction / 100).toFixed(2);
      }
    }
    return action;
  }

  replaceOrAddAction(action: SponsorAction): void {
    this._sponsor.sponsoractions = [
      ...this._sponsor.sponsoractions.filter(a => !this.areActionIdsEqual(a, action)),
      action];
    this.allActions = [
      ...this.allActions.filter(a => !this.areActionIdsEqual(a, action)),
      action];
    this.sortActions();
    this.recalculateBudget();
  }

  updateAction(action: SponsorAction): void {
    this._sponsor.sponsoractions.filter(a => this.areActionIdsEqual(a, action)).forEach(toHold => {
      toHold.bidperaction = action.bidperaction;
      toHold.kinds = action.kinds.toString().split(',');
      toHold.maxcnt = action.maxcnt;
    });
    this.recalculateBudget();
  }

  removeAction(action: SponsorAction) {
    this._sponsor.sponsoractions = [
      ...this._sponsor.sponsoractions.filter(a => !this.areActionIdsEqual(a, action))];
    this.recalculateBudget();
  }

  areActionIdsEqual(a: SponsorAction, b: SponsorAction) {
    return a.action._id === b.action._id
        || a.action === b.action._id
        || a.action._id === b.action;
  }

  isActionSelected(action: SponsorAction): boolean {
    if (!this._sponsor) {
      return false;
    }
    return this._sponsor.sponsoractions
           .filter(a => this.areActionIdsEqual(a, action))
           .length === 1;
  }

  onSponsorActionChaned(action: SponsorAction): void {
    this.updateAction(action);
    this.updateFormGroupActions();
  }

  onSponsorActionSelected(event: SelectionChangedEvent<SponsorAction>): void {
    if (event.selected) {
      this.replaceOrAddAction(event.origin);
    } else {
      this.removeAction(event.origin);
    }
    this.updateFormGroupActions();
  }

  updateFormGroupActions() {
    if (!this.form.controls['sponsoractions']
    || (this.form.controls['sponsoractions'] as FormArray).length !== this._sponsor.sponsoractions.length) {
      const actionFormGroupArray = new FormArray(
        this._sponsor.sponsoractions
        .map(a => this.fb.group(SponsorActionModel)),
      );
      this.form.controls['sponsoractions'] = actionFormGroupArray;
    }
    this.form.patchValue({sponsoractions: this._sponsor.sponsoractions});
  }
}
