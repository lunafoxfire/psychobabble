import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimedRedirectService } from './../../../timed-redirect.service';

@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})

export class UnauthorizedComponent implements OnInit {
  private secondsToRedirect: number = 5;

  constructor(
    private router: Router,
    private redirect: TimedRedirectService
  ) { }

  ngOnInit() {
    this.redirect.initTimer('/', this.secondsToRedirect * 1000, 1000, () => {
      this.secondsToRedirect = this.redirect.getTimeRemainingSec();
    });
    this.redirect.startTimer();
  }
}
