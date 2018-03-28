import { Routes, CanActivate } from '@angular/router';

import { SplashComponent } from './home/splash/splash.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthRole } from './../auth/auth.service';
import { HomeGuardService as HomeGuard } from './home/home-guard.service';
import { AuthGuardService as AuthGuard } from './../auth/auth-guard.service';

export const ROUTES = [
  {
    path: '', component: SplashComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin, AuthRole.Client, AuthRole.Subject] }
  },
];
