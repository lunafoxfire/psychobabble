import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let isRedirectPage = (route.url[0].path === 'already-logged-in');
    if (!isRedirectPage && this.auth.isLoggedIn()) {
      this.router.navigate(['/already-logged-in']);
      return false;
    }
    if (isRedirectPage && !this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
