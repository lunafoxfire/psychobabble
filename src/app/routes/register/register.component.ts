import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import { AuthService, RegisterCredentials } from './../../auth.service';
@Component({
  selector: 'register',
  styleUrls: [ './register.component.scss' ],
  templateUrl: './register.component.html',
  providers: []
})

export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

ngOnInit() {

}

  private onSubmit(registerForm: NgForm) {
    let credentials = registerForm.value as RegisterCredentials;
    this.auth.registerClient(credentials).subscribe(() => {
      this.router.navigateByUrl('/verify');
    });
  }
}
