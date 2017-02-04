import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Club } from '../../model/backend-typings';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClubFormModel } from '../club-form/club-form.model';

@Component({
  selector: 'gymapp-edit-club-page',
  templateUrl: './edit-club-page.component.html',
  styleUrls: ['./edit-club-page.component.scss']
})
export class EditClubPageComponent  {

  form: FormGroup;

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.form = this.fb.group(ClubFormModel);
  }

  doSave(value) {
    console.log(value);
  }
}
