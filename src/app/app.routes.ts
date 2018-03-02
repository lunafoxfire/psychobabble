import { Routes } from '@angular/router';

import { SplashComponent } from './routes/splash/splash.component';
import { LogInComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { VideoComponent } from './routes/video/video.component';
import { ProgramComponent } from './routes/program/program.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { VerifyComponent } from './routes/verify/verify.component';

import { ApiCallTestComponent } from './test/api-call-test/api-call-test.component';
import { AuthTestComponent } from './test/auth-test/auth-test.component';

export const ROUTES: Routes = [
  { path: '',   component: SplashComponent },
  { path: 'login',   component: LogInComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'video',    component: VideoComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'verify',   component: VerifyComponent },
  { path: '**',   component: NotFoundComponent },

  { path: 'test',   component: ApiCallTestComponent },
  { path: 'auth-test',   component: AuthTestComponent },
];
