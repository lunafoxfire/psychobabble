import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data.allowedRoles;
    let authorized = false;
    allowedRoles.forEach((role) => {
      if (!this.auth.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        return false;
      }
      if (role && this.auth.isRole(role)) {
        authorized = true;
      }
    });
    if (!authorized) {
      this.router.navigateByUrl('/unauthorized');
      return authorized;
    } else {
      return authorized;
    }
  }
}
