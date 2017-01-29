import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Club } from '../../model/backend-typings';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'gymapp-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent  {

  form: FormGroup;

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      // clubdetails: this.fb.group({
        name: ['', Validators.required, Validators.minLength(2)],
        label: [''],
        kind: ['', Validators.required, Validators.minLength(2)],
        homepage: [''],
        description: [''],
        googleplushandle: [''],
        facebookhandle: [''],
        linkedinhandle: [''],
        twitterhandle: [''],
        youtubehandle: [''],
      // })
    });
  }

  doSave(value) {
    console.log(value);
  }
}
