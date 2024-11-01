import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function noCuatroNumerosSeguidos(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Verificar si hay números repetidos cuatro veces seguidas
    const regex = /(\d)\1{3}/;
    const isValid = !regex.test(value);
    return isValid ? null : { cuatroNumerosSeguidos: true };
  };
}

export const regexError={
  identification:''

}
