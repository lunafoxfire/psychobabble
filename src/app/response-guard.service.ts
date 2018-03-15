import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ResponseGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data.requireRole;
    if(!this.auth.isLoggedIn()) {
      this.auth.saveResponseUrl(this.router.url);
      this.router.navigateByUrl('/register');
      return false;
    }
    return true
  }
}
