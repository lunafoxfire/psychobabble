import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})

export class UnauthorizedComponent implements OnInit {
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
