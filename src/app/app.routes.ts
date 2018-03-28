import { Routes, CanActivate } from '@angular/router';

export const ROUTES: Routes = [
  { path: '**', redirectTo: '/not-found' },
];
