import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SiteNavBarService {
  private routeData: Promise<NavData>;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.routeData = this.canHasRouteDataPls();
  }

  // THANK YOU https://github.com/angular/angular/issues/19420
  private canHasRouteDataPls(): Promise<NavData> {
    return new Promise((resolve, reject) => {
      this.router.events
        .filter(e => e instanceof NavigationEnd)
        .map(() => this.route)
        .map(route => {
          if (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .subscribe(data => {
          resolve(data as NavData);
        }, err => {
          reject(err);
        });
    });
  }

  public async getRouteData(): Promise<NavData> {
    return this.routeData;
  }
}

export interface NavData {
  navDisplayMode: 'hide' | 'show' | 'animate';
}
