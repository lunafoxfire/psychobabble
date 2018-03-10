import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn, Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[password][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }
  ]
})

export class PasswordValidatorDirective implements Validator {
  public validator: ValidatorFn;

  constructor() {
    this.validator = this.validatePasswordFactory();
  }

  private validatePasswordFactory() : ValidatorFn {
    return (c: AbstractControl) => {
      let yes = c.value
      if(yes) {
        /** Must contain one Uppercase or Lowercase, must contain one Digit, 6 characters or longer */
        let isValid = yes.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g);
        if(isValid) {
          return null
        } else {
          return {
            password: {
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

@Directive({
  selector: '[email][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }
  ]
})

export class EmailValidatorDirective implements Validator {
  public validator: ValidatorFn;

  constructor() {
    this.validator = this.validateEmailFactory();
  }

  private validateEmailFactory() : ValidatorFn {
    return (c: AbstractControl) => {
      let yes = c.value
      if(yes) {
        let isValid = yes.match(/^\w+@\w+\.\w+$/g);
        if(isValid) {
          return null
        } else {
          return {
            email: {
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

@Directive({
  selector: '[username][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true }
  ]
})
export class UsernameValidatorDirective implements Validator {
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
