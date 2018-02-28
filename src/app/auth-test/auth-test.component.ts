import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IUserInfo } from './IUserInfo';

@Component({
  selector: 'auth-test',
  templateUrl: './auth-test.component.html',
  styleUrls: ['./auth-test.component.scss']
})
export class AuthTestComponent implements OnInit {
  userData: Observable<IUserInfo>;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userData = this.http.get<IUserInfo>("/api/test/auth-test");
  }
}
