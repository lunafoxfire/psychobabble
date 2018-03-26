import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from './profile.service';
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: Observable<any>;

  constructor(
    public service: ProfileService,
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = this.service.getProfile();
  }

  public resendVerify() {
    this.auth.reVerify().subscribe((data) => {
      this.router.navigateByUrl('/verify');
    })
  }

  public newAdmin(newAdminEmail) {
    this.auth.registerAdmin(newAdminEmail.value).subscribe(data => {
      console.log(data);
    })
  }
}
