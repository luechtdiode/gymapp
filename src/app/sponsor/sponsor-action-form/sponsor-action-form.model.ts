import { Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function minValue(min: number): ValidatorFn {
  const m = min;
  return (control: AbstractControl): ValidationErrors | null => {
    if (parseFloat(control.value.toString()) >= m) {
      return null;
    }
    return <ValidationErrors> {
      key: 'Should be greater or equals ' + m,
    };
  };
}

export const SponsorActionModel = {
  action: {
    name: [''],
  },
  bidperaction: ['10.00', [minValue(1)]],
  maxcnt: [100, [minValue(1)]],
  kinds: [''],
};
