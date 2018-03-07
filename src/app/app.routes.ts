import { Routes, CanActivate } from '@angular/router';
import { AuthRole } from './auth.service';

import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { HomeGuardService as HomeGuard } from './home-guard.service';
import { LoginGuardService as LoginGuard } from './login-guard.service';

// General
import { SplashComponent } from './routes/splash/splash.component';
import { LogInComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { VideoComponent } from './routes/video/video.component';
import { ProgramComponent } from './routes/program/program.component';
import { VerifyComponent } from './routes/verify/verify.component';

// Admin
import { FeedComponent } from './routes/admin/feed/feed.component';
import { VideosComponent } from './routes/admin/videos/videos.component';
import { ClientsComponent } from './routes/admin/clients/clients.component';

// Client
import { ProgramsComponent } from './routes/client/programs/programs.component';
import { RequestsComponent } from './routes/client/requests/requests.component';

// Error
import { NotFoundComponent } from './routes/error/not-found/not-found.component';
import { UnauthorizedComponent } from './routes/error/unauthorized/unauthorized.component';
import { AlreadyLoggedInComponent } from './routes/error/already-logged-in/already-logged-in.component';

export const ROUTES: Routes = [
  { path: '', component: SplashComponent, canActivate: [HomeGuard] },
  { path: 'login', component: LogInComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'program', component: ProgramComponent },
  { path: 'verify',   component: VerifyComponent },
  { path: 'programs', component: ProgramsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Client} },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Client} },
  { path: 'admin/feed', component: FeedComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/videos', component: VideoComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/clients', component: ClientsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'already-logged-in', component: AlreadyLoggedInComponent, canActivate: [LoginGuard]  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
