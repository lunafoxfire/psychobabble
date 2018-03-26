import { Directive } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[username][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true }
  ]
})
export class UsernameValidatorDirective implements Validator {
  validate(control: FormControl) {
    let input = control.value;
    if(input) {
      const startsWithLetter = input.match(/^[a-z]/gi);
      const onlyValidChars = input.match(/^[a-z0-9\-_]*$/gi);
      if (!startsWithLetter || !onlyValidChars) {
        return {
          startsWithLetter: startsWithLetter ? null : { valid: false },
          onlyValidChars: onlyValidChars ? null : { valid: false }
        };
      }
    }
    return null;
  }
}


@Directive({
  selector: '[password][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }
  ]
})
export class PasswordValidatorDirective implements Validator {
  validate(control: FormControl) {
    let input = control.value;
    if(input) {
      const hasLetter = input.match(/[a-z]/gi);
      const hasNumber = input.match(/[0-9]/gi);
      if (!hasLetter || !hasNumber) {
        return {
          hasLetter: hasLetter ? null : { valid: false },
          hasNumber: hasNumber ? null : { valid: false }
        };
      }
    }
    return null;
  }
}
