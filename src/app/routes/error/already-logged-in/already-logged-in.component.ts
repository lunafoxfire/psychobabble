import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'already-logged-in',
  templateUrl: './already-logged-in.component.html',
  styleUrls: ['./already-logged-in.component.scss']
})

export class AlreadyLoggedInComponent implements OnInit {
  private timeToRedirect: number = 5;
  private timer;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.timeToRedirect--;
      if (this.timeToRedirect <= 0) {
        this.timeToRedirect = 0;
        clearTimeout(this.timer);
        this.router.navigateByUrl('/');
      }
    }, 1000);
  }

}
