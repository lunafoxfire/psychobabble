import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from './../../auth.service';
import { Observable } from 'rxjs/Observable';
import { IUserInfo } from './IUserInfo';

@Component({
  selector: 'auth-test',
  templateUrl: './auth-test.component.html',
  styleUrls: ['./auth-test.component.scss']
})
export class AuthTestComponent implements OnInit {
  public userInfo: Observable<IUserInfo>;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.userInfo = this.auth.post<IUserInfo>("/api/test/auth-test", "howdy doo");
  }
}
