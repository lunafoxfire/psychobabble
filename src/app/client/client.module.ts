import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './client.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../_imports/material.module';
import { SharedModule } from './../shared/shared.module';
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
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [
    ClientService,
  ],
  exports: [],
  entryComponents: [
    ProgramCloseDialogComponent,
    MakeRequestComponent
  ]
})
export class ClientModule { }
