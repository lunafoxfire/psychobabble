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

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit() {

  }

  public onSubmit(registerForm: NgForm) {
    let credentials = registerForm.value as RegisterCredentials;
    if(this.auth.getResponseUrl()) {
      this.auth.registerSubject(credentials).subscribe(() => {
        this.router.navigateByUrl('/verify');
      });
    } else {
      this.auth.registerClient(credentials).subscribe(() => {
        this.router.navigateByUrl('/verify');
      }, (errResponse) => {
        this.setErrorsFromReason(errResponse.error.failureReason);
      });
    }
  }

  public setErrorsFromReason(failureReason: string) {
    console.log(failureReason);
    console.log(this.usernameField);
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
