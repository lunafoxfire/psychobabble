import { Routes, CanActivate } from '@angular/router';

import { AlreadyLoggedInComponent } from './already-logged-in/already-logged-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { AuthRole } from './../auth/auth.service';
import { LoginGuardService as LoginGuard } from './../auth/login-guard.service';

export const ROUTES = [
  {
    path: 'already-logged-in', component: AlreadyLoggedInComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'unauthorized', component: UnauthorizedComponent
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
];
