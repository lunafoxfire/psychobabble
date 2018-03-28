import { NgModule } from '@angular/core';

// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// External imports
import { MaterialModule } from './_imports/material.module';

// Our imports
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { SubjectModule } from './subject/subject.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './error/error.module';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    AdminModule,
    ClientModule,
    SubjectModule,
    SharedModule,
    ErrorModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
