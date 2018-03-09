import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn, Validator, FormControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[username][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FormValidatorDirective, multi: true }
  ]
})
export class FormValidatorDirective implements Validator {
  public validator: ValidatorFn;

  constructor() {
    this.validator = this.validateUsernameFactory();
  }

  private validateUsernameFactory() : ValidatorFn {
    return (c: AbstractControl) => {
      let yes = c.value
      if(yes) {
        let isValid = yes.match(/^[^\s]*$/g);
        if(isValid) {
          return null
        } else {
          return {
            username: {
              valid: false
            }
          }
        }
      }
    }
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
