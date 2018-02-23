import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const ROUTES: Routes = [
  { path: '',   component: SplashComponent },
  { path: 'login',   component: LogInComponent },
  { path: 'register',   component: RegisterComponent },
  { path: '**',   component: NotFoundComponent },
];
