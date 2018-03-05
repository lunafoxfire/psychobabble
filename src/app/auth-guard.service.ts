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
    const requiredRole = route.data.requireRole;
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    if (requiredRole && !this.auth.isRole(requiredRole)) {
      this.router.navigateByUrl('/unauthorized');
      return false;
    }
    return true;
  }
}
