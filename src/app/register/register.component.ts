import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
      this.mailCall();
    }

    private mailCall() {

      let msg = {
        to: 'adamtitus76@gmail.com',
        from: process.env.ADMIN_EMAIL,
        subject: 'I AM SENDING AN EMAIL WITH AN API',
        text: 'SUP',
        html: '<small><small>I can even do tiny text with html</small></small>',
      };

      sgMail.send(msg);
    }
}
