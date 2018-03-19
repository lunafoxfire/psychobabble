import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from './profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: Observable<any>;

  constructor(
    public service: ProfileService
  ) { }

  ngOnInit() {
    this.user = this.service.getProfile();
    this.user.subscribe((data) => {
      console.log(data);
    })
  }

}
