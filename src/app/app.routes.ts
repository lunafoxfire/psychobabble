import { Routes } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VideoComponent } from './video/video.component';
import { ProgramComponent } from './program/program.component';

import { ApiCallTestComponent } from './api-call-test/api-call-test.component';
import { AuthTestComponent } from './auth-test/auth-test.component';

export const ROUTES: Routes = [
  { path: '',   component: SplashComponent },
  { path: 'login',   component: LogInComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'video',    component: VideoComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'test',   component: ApiCallTestComponent },
  { path: 'auth-test',   component: AuthTestComponent },
  { path: '**',   component: NotFoundComponent },
];
