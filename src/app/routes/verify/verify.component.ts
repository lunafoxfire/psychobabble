import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  public sendCode(code) {
    this.auth.verify(code.value).subscribe(() => {
      console.log(this.auth.getTokenPayload());
      this.router.navigateByUrl('/');
    });
  }
}
