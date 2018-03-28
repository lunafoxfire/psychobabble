import { Component, OnInit } from '@angular/core';
import { AuthService, RegisterCredentials } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.auth.verifyAdmin().subscribe(data => {
      console.log(data);
    });
  }

  public onSubmit(form: NgForm) {
    const credentials = form.value as RegisterCredentials;
    this.auth.changeAdmin(credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
