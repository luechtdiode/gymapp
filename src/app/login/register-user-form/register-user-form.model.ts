import { Validators, FormGroup, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import { PasswordValidation } from './password-validator';

const createModel = (initial: boolean) => {
   if (initial) {
    return {
      username: [, [Validators.required, Validators.minLength(2)]],
      password: [, [Validators.required, Validators.minLength(2)]],
      password2: [, [Validators.required, Validators.minLength(2)]],
      firstname: [, [Validators.required, Validators.minLength(2)]],
      email: [, [Validators.required, Validators.email]],
      lastname: [],
    } ;
  } else {
    return {
      username: [, [Validators.required, Validators.minLength(2)]],
      password: [ ],
      password2: [ ],
      firstname: [, [Validators.required, Validators.minLength(2)]],
      email: [, [Validators.required, Validators.email]],
      lastname: [],
    };
  }
};

export const createWithModel = (fb: FormBuilder, initial: boolean = true) => {
  return fb.group(createModel(initial), {
    validator: PasswordValidation.MatchPassword,
  });
};
