import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'register',
  styleUrls: [ './register.component.scss' ],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  @ViewChild('registerForm') registerForm: NgForm;
  @ViewChild('username') usernameField: NgModel;
  @ViewChild('email') emailField: NgModel;
  @ViewChild('password') passwordField: NgModel;
  public thinking = false;
  public submitted = false;

  constructor(
    public regService: RegisterService,
    public router: Router
  ) {}

  public async onSubmit() {
    this.submitted = true;
    this.thinking = true;
    if (this.registerForm.valid) {
      const result = await this.regService.register(this.registerForm.value);
      if (result.success) {
        this.router.navigateByUrl('/verify');
      } else {
        this.thinking = false;
        this.setErrorsFromReason(result.failureReason);
      }
    } else { // Have a bit of delay just to give the user some feedback
      setTimeout(() => {
        this.thinking = false;
      }, 500);
    }
  }

  private setErrorsFromReason(failureReason: string) {
    switch (failureReason) {
      case "BAD_USERNAME":
        this.usernameField.control.setErrors({...this.usernameField.errors, badUsername: true});
        break;
      case "USERNAME_TAKEN":
        this.usernameField.control.setErrors({...this.usernameField.errors, usernameTaken: true});
        break;
      case "BAD_PASSWORD":
        this.passwordField.control.setErrors({...this.passwordField.errors, badPassword: true});
        break;
      case "BAD_EMAIL":
        this.emailField.control.setErrors({...this.emailField.errors, badEmail: true});
        break;
      case "EMAIL_TAKEN":
        this.emailField.control.setErrors({...this.emailField.errors, emailTaken: true});
        break;
      default:
        this.registerForm.control.setErrors({...this.registerForm.errors, unknownError: true});
        break;
    }
  }
}
