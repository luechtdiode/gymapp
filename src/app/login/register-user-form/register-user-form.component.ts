import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'gymapp-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss'],
})
export class RegisterUserFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
