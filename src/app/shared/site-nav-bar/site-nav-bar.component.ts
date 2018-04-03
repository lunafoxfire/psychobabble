import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'site-nav-bar',
  styleUrls: [ './site-nav-bar.component.scss' ],
  templateUrl: './site-nav-bar.component.html'
})

export class SiteNavBarComponent implements OnInit {
  public scroll: boolean = false;
  public programId: string;
  public loggedInUser: string;

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    let token = this.auth.getTokenPayload();
    if(token) {
      //TODO: Display correct name without refresh
      this.loggedInUser = token.username;
    }
    window.onscroll = () => {
      if(window.pageYOffset > 100) {
        this.scroll = true;
      } else {
        this.scroll = false;
      }
    }
  }

  public isScrolled() {
    if(window.location.pathname === "/") {
      if(this.scroll) {
        return "scroll-navbar";
      } else {
        return "hide-navbar";
      }
    } else if (window.location.pathname.match(/^\/programs\/.*$/m)) {
      return "hide-navbar";
    } else {
      return "show-navbar";
    }
  }
}
