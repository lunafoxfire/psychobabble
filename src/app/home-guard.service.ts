import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class HomeGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      if (this.auth.isAdmin()) {
        this.router.navigateByUrl('/admin/feed');
        return false;
      }
      else if (this.auth.isClient()) {
        this.router.navigateByUrl('/programs');
        return false;
      }
      else if (this.auth.isSubject()) {
        this.router.navigateByUrl('/not-found'); // TODO: Temp redirect url
        return false;
      }
      else {
        this.router.navigateByUrl('/unauthorized');
        return false;
      }
    }
    return true;
  }
}
