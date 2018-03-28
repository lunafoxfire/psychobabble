import { Routes, CanActivate } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyComponent } from './verify/verify.component';

import { AuthRole } from './../auth/auth.service';
import { LoginGuardService as LoginGuard } from './../auth/login-guard.service';
import { AuthGuardService as AuthGuard } from './../auth/auth-guard.service';

export const ROUTES: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'verify', component: VerifyComponent
  },
  {
    path: 'new-admin', component: NewAdminComponent,
    canActivate: [AuthGuard], data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'password-reset', component: ResetComponent
  },
  {
    path: 'reset/:uid/:prt', component: ChangePasswordComponent
  },
];
