import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class TimedRedirectService {
  private redirectURL: string;
  private duration: number;
  private timeStep: number;
  private timeToRedirect: number;
  private tickCallback: {(): void};
  private isInitialized: boolean;
  private timer;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.clearTimer();
      }
    });
  }

  public initTimer(redirectURL: string, duration: number, timeStep: number, tickCallback: {(): void} = null) {
    this.redirectURL = redirectURL;
    this.duration = duration;
    this.timeStep = timeStep;
    this.timeToRedirect = duration;
    this.tickCallback = tickCallback;
    this.isInitialized = true;
  }

  public startTimer() {
    if (!this.isInitialized) {
      throw new Error("The timer was started but never initialized.");
    }

    this.timer = setInterval(() => {
      if (this.timeToRedirect > 0) {
        this.timeToRedirect -= this.timeStep;
        if (this.tickCallback) {
          this.tickCallback();
        }
      } else {
        this.router.navigateByUrl(this.redirectURL);
        this.clearTimer();
      }
    }, this.timeStep);
  }

  public stopTimer() {
    clearTimeout(this.timer);
    this.timer = null;
    this.timeToRedirect = this.duration;
  }

  public clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
    this.redirectURL = null;
    this.duration = 0;
    this.timeStep = 0;
    this.timeToRedirect = 0;
    this.tickCallback = null;
    this.isInitialized = false;
  }

  public getTimeRemaining(): number {
    return this.timeToRedirect;
  }

  public getTimeRemainingSec(): number {
    return Math.floor(this.timeToRedirect / 1000);
  }
}
