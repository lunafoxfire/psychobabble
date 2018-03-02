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
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  private sendCode(code) {
    this.auth.verify(code.value).subscribe(() => {
      console.log(this.auth.getTokenPayload());
      this.router.navigateByUrl('/');
    });
  }
}
