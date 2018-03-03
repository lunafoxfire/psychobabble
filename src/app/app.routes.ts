import { Routes, CanActivate } from '@angular/router';
import { AuthRole } from './auth.service';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

// General
import { SplashComponent } from './routes/splash/splash.component';
import { LogInComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { VideoComponent } from './routes/video/video.component';
import { ProgramComponent } from './routes/program/program.component';

// Admin
import { FeedComponent } from './routes/admin/feed/feed.component';
import { VideosComponent } from './routes/admin/videos/videos.component';
import { ClientsComponent } from './routes/admin/clients/clients.component';

// Client
import { PlaylistsComponent } from './routes/client/playlists/playlists.component';
import { RequestsComponent } from './routes/client/requests/requests.component';

// Error
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { UnauthorizedComponent } from './routes/unauthorized/unauthorized.component';

import { ApiCallTestComponent } from './test/api-call-test/api-call-test.component';
import { AuthTestComponent } from './test/auth-test/auth-test.component';

export const ROUTES: Routes = [
  { path: '',   component: SplashComponent },
  { path: 'login',   component: LogInComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'video',    component: VideoComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Client} },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Client} },
  { path: 'admin/feed', component: FeedComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/videos', component: VideosComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/clients', component: ClientsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'unauthorized',   component: UnauthorizedComponent },
  { path: '**',   component: NotFoundComponent },

  { path: 'test',   component: ApiCallTestComponent },
  { path: 'auth-test',   component: AuthTestComponent },
];
