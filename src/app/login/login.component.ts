import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserCredentials } from './../auth.service';

@Component({
  selector: 'login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})

export class LogInComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ){ }

  private onSubmit(loginForm: NgForm) {
    let credentials = loginForm.value as UserCredentials;
    this.auth.login(credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
