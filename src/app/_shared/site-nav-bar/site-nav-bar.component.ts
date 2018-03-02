import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'site-nav-bar',
  styleUrls: [ './site-nav-bar.component.scss' ],
  templateUrl: './site-nav-bar.component.html'
})

export class SiteNavBarComponent {
  constructor(
    private auth: AuthService
  ){ }

  ngOnInit() {

  }
}
