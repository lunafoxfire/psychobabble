
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
    private router: Router,
    private http: HttpClient
  ) { }

  private onSubmit(registerForm: NgForm) {
    let credentials = registerForm.value as UserCredentials;
    this.auth.registerClient(credentials).subscribe(() => {
      this.router.navigateByUrl('/');
      this.mailCall();
    });
  }
  private mailCall() {
    let msg = {
      to: 'adamtitus76@gmail.com',
      from: 'noreply@inter.com',
      subject: 'I AM SENDING AN EMAIL WITH AN API',
      text: 'SUP',
      html: '<small><small>I can even do tiny text with html</small></small>',
    };
    this.http.post("/api/sendMail", msg).subscribe((data) => {
      console.log(data)
    })
  }
}
