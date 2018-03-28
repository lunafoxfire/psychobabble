import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './../_imports/material.module';

import { AlreadyLoggedInComponent } from './already-logged-in/already-logged-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { TimedRedirectService } from './timed-redirect.service';

@NgModule({
  declarations: [
    AlreadyLoggedInComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([]),
  ],
  providers: [
    TimedRedirectService,
  ],
  exports: []
})
export class ErrorModule { }
