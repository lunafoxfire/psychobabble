import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserCredentials } from './../auth.service';

@Component({
  selector: 'register',
  styleUrls: [ './register.component.scss' ],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  private onSubmit(registerForm: NgForm) {
    let credentials = registerForm.value as UserCredentials;
    this.auth.registerClient(credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
