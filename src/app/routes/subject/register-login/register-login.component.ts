import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterCredentials, LoginCredentials } from './../../../auth.service';

@Component({
  selector: 'register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  public toggle: boolean = true;

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  public toggleTrue() {
    this.toggle = true;
  }

  public toggleFalse() {
    this.toggle = false;
  }

  public onRegister(registerForm: NgForm) {
    let credentials = registerForm.value as RegisterCredentials;
    this.auth.registerSubject(credentials).subscribe(() => {
      this.router.navigateByUrl('/verification');//TODO: Pass program id along with link
    });
  }

  public onLogin(loginForm: NgForm) {
    let credentials = loginForm.value as LoginCredentials;
    this.auth.login(credentials).subscribe(() => {
      this.router.navigateByUrl('/program');//TODO: Navigate back to evaluation
    });
  }
}
