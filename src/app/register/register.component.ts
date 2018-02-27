import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'register',
  styleUrls: [ './register.component.scss' ],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  constructor(
    private http: HttpClient
  ) { }

  private onSubmit(registerForm: NgForm) {
    this.http.post("/api/auth/client/register", registerForm.value)
      .subscribe((data) => {
        console.log(registerForm.value);
        console.log(data);
      });
    }
}
