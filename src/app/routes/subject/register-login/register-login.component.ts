import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, RegisterCredentials } from './../../../auth.service';

@Component({
  selector: 'register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  public toggle: boolean = true;

  constructor(
    public auth: AuthService
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
  }

  public onLogin(form) {

  }
}
