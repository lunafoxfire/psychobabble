import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './subject.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../_imports/material.module';

import { EvaluationComponent } from './evaluation/evaluation.component';

import { ResponseGuardService } from './response-guard.service';
import { SubjectService } from './subject.service';
import { AudioRecorderService } from './evaluation/audio-recorder.service';
import { EvaluationService } from './evaluation/evaluation.service';

@NgModule({
  declarations: [
    EvaluationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [
    ResponseGuardService,
    SubjectService,
    AudioRecorderService,
    EvaluationService,
  ],
  exports: []
})
export class SubjectModule { }
