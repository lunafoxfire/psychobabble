import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class ResponseGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data.requireRole;
    if (!this.auth.isLoggedIn()) {
      this.auth.saveResponseUrl(`${route.url[0].path}/${route.url[1].path}`);
      this.router.navigateByUrl('/register');
      return false;
    }
    if (requiredRole && !this.auth.isRole(requiredRole)) {
      this.router.navigateByUrl('/');
      return false;
    }
    this.auth.clearResponseUrl();
    return true;
  }
}
