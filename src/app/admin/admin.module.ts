import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './admin.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../_imports/material.module';
import { SharedModule } from './../shared/shared.module';

import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientProgramDetailsComponent } from './clients/client-details/client-program-details/client-program-details.component';
import { ProgramDesignComponent } from './request-feed/program-design/program-design.component';
import { ResponseEvaluationComponent } from './program-feed/response-evaluation/response-evaluation.component';
import { ScoringComponent } from './program-feed/response-evaluation/scoring/scoring.component';
import { VideosComponent } from './videos/videos.component';
import { VideoUploadComponent } from './videos/video-upload/video-upload.component';
import { ProgramFeedComponent } from './program-feed/program-feed.component';
import { RequestFeedComponent } from './request-feed/request-feed.component';

import { AdminService } from './admin.service';
import { VideoService } from './videos/video.service';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailsComponent,
    ClientProgramDetailsComponent,
    ProgramDesignComponent,
    ResponseEvaluationComponent,
    ScoringComponent,
    VideosComponent,
    VideoUploadComponent,
    ProgramFeedComponent,
    RequestFeedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  providers: [
    AdminService,
    VideoService,
  ],
  exports: [],
  entryComponents: [
    VideoUploadComponent
  ]
})
export class AdminModule { }
