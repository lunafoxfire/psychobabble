import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'log-in',
  styleUrls: [ './log-in.component.scss' ],
  templateUrl: './log-in.component.html'
})

export class LogInComponent {
  constructor(private http: HttpClient){ }

  private onSubmit(loginForm: NgForm) {
    this.http.post("/api/auth/login", loginForm.value).subscribe((data) => {
      console.log(loginForm.value);
      console.log(data);
    });
  }
}
