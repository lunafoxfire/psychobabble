import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './admin.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../_imports/material.module';

import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientProgramDetailsComponent } from './clients/client-details/client-program-details/client-program-details.component';
import { FeedComponent } from './feed/feed.component';
import { ProgramDesignComponent } from './feed/program-design/program-design.component';
import { ResponseEvaluationComponent } from './feed/response-evaluation/response-evaluation.component';
import { ScoringComponent } from './feed/response-evaluation/scoring/scoring.component';
import { VideosComponent } from './videos/videos.component';
import { VideoUploadComponent } from './videos/video-upload/video-upload.component';

import { AdminService } from './admin.service';
import { VideoService } from './videos/video.service';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailsComponent,
    ClientProgramDetailsComponent,
    FeedComponent,
    ProgramDesignComponent,
    ResponseEvaluationComponent,
    ScoringComponent,
    VideosComponent,
    VideoUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [
    AdminService,
    VideoService,
  ],
  exports: []
})
export class AdminModule { }
