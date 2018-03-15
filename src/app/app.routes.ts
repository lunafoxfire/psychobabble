import { Routes, CanActivate } from '@angular/router';
import { AuthRole } from './auth.service';

import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { HomeGuardService as HomeGuard } from './home-guard.service';
import { LoginGuardService as LoginGuard } from './login-guard.service';
import { ResponseGuardService as ResponseGuard } from './response-guard.service';
import { VerifyGuardService as VerifyGuard } from './verify-guard.service';

// General
import { SplashComponent } from './routes/splash/splash.component';
import { LogInComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { VideoUploadComponent } from './routes/admin/videos/video-upload/video-upload.component';
import { VerifyComponent } from './routes/verify/verify.component';
import { ResetComponent } from './routes/reset/reset.component';
import { ChangePasswordComponent } from './routes/change-password/change-password.component';

// Admin
import { FeedComponent } from './routes/admin/feed/feed.component';
import { VideosComponent } from './routes/admin/videos/videos.component';
import { ClientsComponent } from './routes/admin/clients/clients.component';
import { ProgramDesignComponent } from './routes/admin/feed/program-design/program-design.component';
import { ResponseEvaluationComponent } from './routes/admin/feed/response-evaluation/response-evaluation.component';

// Client
import { ProgramsComponent } from './routes/client/programs/programs.component';
import { RequestsComponent } from './routes/client/requests/requests.component';
import { ProgramDetailsComponent } from './routes/client/programs/program-details/program-details.component';

// Subject
import { EvaluationComponent } from './routes/subject/evaluation/evaluation.component';

// Error
import { NotFoundComponent } from './routes/error/not-found/not-found.component';
import { UnauthorizedComponent } from './routes/error/unauthorized/unauthorized.component';
import { AlreadyLoggedInComponent } from './routes/error/already-logged-in/already-logged-in.component';

export const ROUTES: Routes = [
  { path: '', component: SplashComponent, canActivate: [HomeGuard] },
  { path: 'login', component: LogInComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'verify',   component: VerifyComponent },
  { path: 'programs', component: ProgramsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Client} },
  { path: 'programs/:id', component: EvaluationComponent, canActivate: [ResponseGuard, VerifyGuard], data: {requireRole: AuthRole.Subject} },
  { path: 'programs/client/:id', component: ProgramDetailsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Client}},
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Client} },
  { path: 'admin/feed', component: FeedComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/videos', component: VideosComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/videos/upload', component: VideoUploadComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/feed/requests/:id', component: ProgramDesignComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/feed/programs/:id', component: ResponseEvaluationComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'admin/clients', component: ClientsComponent, canActivate: [AuthGuard], data: {requireRole: AuthRole.Admin} },
  { path: 'already-logged-in', component: AlreadyLoggedInComponent, canActivate: [LoginGuard]  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'password-reset', component: ResetComponent },
  { path: 'reset/:uid/:prt', component: ChangePasswordComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
