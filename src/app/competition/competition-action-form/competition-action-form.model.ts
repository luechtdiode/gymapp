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

export const CompetitionActionModel = {
  selected: [],
  action: {
    name: [''],
  },
  costperaction: ['10.00', [minValue(0.01)]],
  maxcnt: [100, [minValue(1)]],
};
