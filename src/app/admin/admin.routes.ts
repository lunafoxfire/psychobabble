import { Routes, CanActivate } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientProgramDetailsComponent } from './clients/client-details/client-program-details/client-program-details.component';
import { FeedComponent } from './feed/feed.component';
import { ProgramDesignComponent } from './feed/program-design/program-design.component';
import { ResponseEvaluationComponent } from './feed/response-evaluation/response-evaluation.component';
import { ScoringComponent } from './feed/response-evaluation/scoring/scoring.component';
import { VideosComponent } from './videos/videos.component';
import { VideoUploadComponent } from './videos/video-upload/video-upload.component';

import { AuthRole } from './../auth/auth.service';
import { AuthGuardService as AuthGuard } from './../auth/auth-guard.service';

export const ROUTES: Routes = [
  {
    path: 'admin/feed', component: FeedComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/feed/requests/:id', component: ProgramDesignComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/feed/programs/:id', component: ResponseEvaluationComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/feed/programs/:pid/subject/:sid/responses', component: ScoringComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/videos', component: VideosComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/videos/upload', component: VideoUploadComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/clients', component: ClientsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/clients/:id', component: ClientDetailsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
  {
    path: 'admin/clients/:cid/program/:pid', component: ClientProgramDetailsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: [AuthRole.Admin] }
  },
];
