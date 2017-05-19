import { Validators } from '@angular/forms';

export const RegisterUserFormModel = {
  username: [, [Validators.required, Validators.minLength(2)]],
  password: [, [Validators.required, Validators.minLength(2)]],
  firstname: [, [Validators.required, Validators.minLength(2)]],
  lastname: [],

};
