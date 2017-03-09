import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Sponsor, SponsorAction } from '../../model/backend-typings';
import { RouterPath } from '../../app.routing';
import { SelectionChangedEvent } from '../../shared/util';

@Component({
  selector: 'gymapp-sponsor-form',
  templateUrl: './sponsor-form.component.html',
  styleUrls: ['./sponsor-form.component.scss']
})
export class SponsorFormComponent implements OnInit {
  sponsorsLink = '/' + RouterPath.SPONSORS;

  budget: number;

  _sponsor: Sponsor;
  _regactions: SponsorAction[];
  allActions: SponsorAction[];

  @Input()
  set regactions(regactions: SponsorAction[]) {
    this._regactions = regactions.map(a => Object.assign({}, a));
    this.syncSponsorActions();
  }

  get regactions(): SponsorAction[] {
    return this._regactions;
  }

  @Input()
  set sponsor(sponsor: Sponsor) {
    this._sponsor = Object.assign({sponsoractions: []}, sponsor);
    this.syncSponsorActions();
  }

  get sponsor(): Sponsor {
    return this._sponsor;
  }

  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  syncSponsorActions(): void {
    this.allActions = [...this._regactions];
    if (this._sponsor) {
      this._sponsor.sponsoractions.forEach(action => this.replaceAction(action));
    }
    this.sortActions();
  }

  sortActions(): void {
    this.allActions.sort((a, b) => {
      return a.action.name.localeCompare(b.action.name);
    });
  }

  replaceAction(action: SponsorAction): void {
    this.allActions = [
      ...this.allActions.filter(a => !this.areActionIdsEqual(a, action)),
      action];
    this.sortActions();
  }

  addAction(action: SponsorAction): void {
    this._sponsor.sponsoractions = [
      ...this._sponsor.sponsoractions.filter(a => !this.areActionIdsEqual(a, action)),
      action];
    this.replaceAction(action);
  }

  removeAction(action: SponsorAction) {
    this._sponsor.sponsoractions = [
      ...this._sponsor.sponsoractions.filter(a => !this.areActionIdsEqual(a, action))];
  }

  areActionIdsEqual(a: SponsorAction, b: SponsorAction) {
    return a.action._id === b.action._id;
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
    console.log('onSponsorActionChanged');
    this.replaceAction(action);
    this.form.patchValue({sponsoractions: this.sponsor.sponsoractions});
  }

  onSponsorActionSelected(event: SelectionChangedEvent<SponsorAction>): void {
    if (event.selected) {
      this.addAction(event.origin);
    } else {
      this.removeAction(event.origin);
    }
    this.form.patchValue({sponsoractions: this.sponsor.sponsoractions});
  }

}
