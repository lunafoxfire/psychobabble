import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService, RegisterCredentials } from './../../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'register',
  styleUrls: [ './register.component.scss' ],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  @ViewChild('username') usernameField: NgModel;
  @ViewChild('email') emailField: NgModel;
  @ViewChild('password') passwordField: NgModel;

  public thinking: boolean = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  public async onSubmit(registerForm: NgForm) {
    this.thinking = true;
    if (registerForm.valid) {
      let result = await this.register(registerForm.value);
      if (result.success) {
        this.router.navigateByUrl('/verify');
      }
      else {
        this.thinking = false;
        this.setErrorsFromReason(result.failureReason);
      }
    }
    else { // Have a bit of delay just to give the user some feedback
      setTimeout(() => {
        this.thinking = false;
      }, 500);
    }
  }

  private register(credentials: RegisterCredentials): Promise<RegisterResult> {
    return new Promise((resolve, reject) => {
      if(this.auth.getResponseUrl()) {
        this.auth.registerSubject(credentials).subscribe(() => {
          resolve({success: true});
        }, (errResponse) => {
          resolve({success: false, failureReason: errResponse.error.failureReason});
        });
      } else {
        this.auth.registerClient(credentials).subscribe(() => {
          resolve({success: true});
        }, (errResponse) => {
          resolve({success: false, failureReason: errResponse.error.failureReason});
        });
      }
    });
  }

  private setErrorsFromReason(failureReason: string) {
    switch(failureReason) {
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
        console.log("UNKNOWN ERROR");
        break;
    }
  }
}

interface RegisterResult {
  success: boolean;
  failureReason?: string;
}
