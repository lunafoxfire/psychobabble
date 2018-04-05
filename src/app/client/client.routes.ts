import { Routes, CanActivate } from '@angular/router';

import { ProgramsComponent, ProgramCloseDialogComponent } from './programs/programs.component';
import { ProgramDetailsComponent } from './programs/program-details/program-details.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestDetailsComponent } from './requests/request-details/request-details.component';

import { AuthRole } from './../auth/auth.service';
import { AuthGuardService as AuthGuard } from './../auth/auth-guard.service';

export const ROUTES: Routes = [
  {
    path: 'programs', component: ProgramsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Client] }
  },
  {
    path: 'programs/client/:id', component: ProgramDetailsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Client] }
  },
  {
    path: 'requests', component: RequestsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Client] }
  },
  {
    path: 'requests/client/:id', component: RequestDetailsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Client, AuthRole.Admin] }
  },
];
