import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'gymapp-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss']
})
export class ClubFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  ngOnInit() {
  }

}