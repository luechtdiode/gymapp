import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SponsorAction } from '../../model/backend-typings';

@Component({
  selector: 'gymapp-sponsor-action-form',
  templateUrl: './sponsor-action-form.component.html',
  styleUrls: ['./sponsor-action-form.component.scss']
})
export class SponsorActionFormComponent implements OnInit {

  @Input()
  action: SponsorAction;

  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
