import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SiteNavBarService, NavData } from './site-nav-bar.service';
import { Observable } from 'rxjs/Observable';

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
    public route: ActivatedRoute,
    public navService: SiteNavBarService,
  ) { }

  ngOnInit() {
    const token = this.auth.getTokenPayload();
    if(token) {
      // TODO: Display correct name without refresh
      this.loggedInUser = token.username;
    }
    window.onscroll = () => {
      if(window.pageYOffset > 100) {
        this.scroll = true;
      } else {
        this.scroll = false;
      }
    };
  }

  public isScrolled() {
    if (window.location.pathname === "/") {
      if (this.scroll) {
        return "scroll-navbar";
      } else {
        return "hide-navbar";
      }
    } else if (window.location.pathname.match(/^\/programs\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/im)) {
      return "hide-navbar";
    } else {
      return "show-navbar";
    }
  }

  // public getDisplayMode(): Observable<string> {
  //   return Observable.create(observer => {
  //     this.navService.getRouteData().then(data => {
  //       if (data.navDisplayMode === 'animate') {
  //         if (this.scroll) {
  //           observer.next("scroll-navbar");
  //         }
  //         else {
  //           observer.next("hide-navbar");
  //         }
  //       }
  //       else if (data.navDisplayMode === 'hide') {
  //         observer.next("hide-navbar");
  //       }
  //       else {
  //         observer.next("show-navbar");
  //       }
  //       // observer.complete();
  //     });
  //   });
  // }
}
