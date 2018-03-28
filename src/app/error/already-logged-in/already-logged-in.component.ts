import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimedRedirectService } from '../timed-redirect.service';

@Component({
  selector: 'already-logged-in',
  templateUrl: './already-logged-in.component.html',
  styleUrls: ['./already-logged-in.component.scss']
})

export class AlreadyLoggedInComponent implements OnInit {
  public secondsToRedirect: number = 5;

  constructor(
    public router: Router,
    public redirect: TimedRedirectService
  ) { }

  ngOnInit() {
    this.redirect.initTimer('/', this.secondsToRedirect * 1000, 1000, () => {
      this.secondsToRedirect = this.redirect.getTimeRemainingSec();
    });
    this.redirect.startTimer();
  }
}
