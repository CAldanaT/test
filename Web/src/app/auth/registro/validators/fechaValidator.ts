import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fechaValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value) {
    const selectedDate = new Date(control.value);
    
    if (isNaN(selectedDate.getTime())) {
        return { 'fechaInvalida': true }
    }

    const today = new Date();
    const hundredYearsAgo = new Date(today);
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);

    if (selectedDate > today || selectedDate < hundredYearsAgo) {
      return { 'fechaFueraDeRango': true };
    }
  }
  return null;
}