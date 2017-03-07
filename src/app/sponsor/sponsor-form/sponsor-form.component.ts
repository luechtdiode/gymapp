import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Sponsor, SponsorAction } from '../../model/backend-typings';
import { RouterPath } from '../../app.routing';

@Component({
  selector: 'gymapp-sponsor-form',
  templateUrl: './sponsor-form.component.html',
  styleUrls: ['./sponsor-form.component.scss']
})
export class SponsorFormComponent implements OnInit {
  sponsorsLink = '/' + RouterPath.SPONSORS;
  /*
  @Input()
  sponsor: Sponsor;

  @Input()
  sponsoractions: SponsorAction[];
*/
  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
