import { Routes, CanActivate } from '@angular/router';

import { EvaluationComponent } from './evaluation/evaluation.component';

import { AuthRole } from './../auth/auth.service';
import { VerifyGuardService as VerifyGuard } from './../auth/verify-guard.service';
import { ResponseGuardService as ResponseGuard } from './response-guard.service';

export const ROUTES = [
  {
    path: 'programs/:id', component: EvaluationComponent,
    canActivate: [ResponseGuard, VerifyGuard],
    data: { allowedRoles: [AuthRole.Subject] }
  },
];
