import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'site-nav-bar',
  styleUrls: [ './site-nav-bar.component.scss' ],
  templateUrl: './site-nav-bar.component.html'
})

export class SiteNavBarComponent implements OnInit {
  public scroll: boolean = false;
  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    window.onscroll = () => {
      if(window.pageYOffset > 10) {
        this.scroll = true;
      } else {
        this.scroll = false;
      }
    }
  }

  isScrolled() {
    if(!this.auth.isAdmin) {
      if(this.scroll) {
        return "show-navbar";
      } else {
        return "hide-navbar";
      }
    } else {
      return "show-navbar";
    }
  }
}
