import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPass');

    if (password && confirm && password.value !== confirm.value) {
        return { 'misMatch': true };
    }
    return null;
}
