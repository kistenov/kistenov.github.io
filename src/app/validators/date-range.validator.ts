import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateRangeValidator = (field: string): ValidatorFn | null => {
  return (control: AbstractControl): ValidationErrors | null => {
    const matchingControl = control.root.get(field);

    if (!control.value || !matchingControl?.value) {
      return null;
    }

    return new Date(matchingControl.value).valueOf() >
      new Date(control.value).valueOf()
      ? { dateRange: { field } }
      : null;
  };
};
