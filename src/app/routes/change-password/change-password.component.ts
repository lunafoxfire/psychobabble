import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private userId: string;
  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
    });
  }

  public submitNew(newPassword){
    console.log(this.userId);
    this.auth.makeNewPass(newPassword.value, this.userId).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/');
    })
  }

  public resend() {
    this.auth.resendPassReset(this.userId).subscribe((data) => {
      console.log(data);
    })
  }
}
