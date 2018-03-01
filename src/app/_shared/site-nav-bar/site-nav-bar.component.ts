import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'site-nav-bar',
  styleUrls: [ './site-nav-bar.component.scss' ],
  templateUrl: './site-nav-bar.component.html'
})

// TODO: Change content depending on authentication
export class SiteNavBarComponent {
  constructor(
    private auth: AuthService
  ){ }

  ngOnInit() {

  }
}
