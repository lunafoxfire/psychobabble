import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  // TODO: Don't do this like this...
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let alreadyLoggedInPath = (route.url[0].path == 'already-logged-in');
    if (this.auth.isLoggedIn() && !alreadyLoggedInPath) {
      this.router.navigateByUrl('/already-logged-in');
      return false;
    }
    else if (!this.auth.isLoggedIn() && alreadyLoggedInPath) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
