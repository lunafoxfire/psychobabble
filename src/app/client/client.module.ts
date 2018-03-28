import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './../_imports/material.module';

import { ProgramsComponent, ProgramCloseDialogComponent } from './programs/programs.component';
import { ProgramDetailsComponent } from './programs/program-details/program-details.component';
import { RequestsComponent } from './requests/requests.component';
import { MakeRequestComponent } from './requests/make-request/make-request.component';
import { RequestDetailsComponent } from './requests/request-details/request-details.component';

import { ClientService } from './client.service';

@NgModule({
  declarations: [
    ProgramsComponent,
    ProgramDetailsComponent,
    RequestsComponent,
    MakeRequestComponent,
    RequestDetailsComponent,
    ProgramCloseDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([]),
  ],
  providers: [
    ClientService,
  ],
  exports: [],
  entryComponents: [
    ProgramCloseDialogComponent,
  ]
})
export class ClientModule { }
