import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './shared.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../_imports/material.module';

import { SplashComponent } from './home/splash/splash.component';
import { ProfileComponent } from './profile/profile.component';
import { SiteNavBarComponent } from './site-nav-bar/site-nav-bar.component';

import { HomeGuardService } from './home/home-guard.service';
import { ProfileService } from './profile/profile.service';

@NgModule({
  declarations: [
    SplashComponent,
    ProfileComponent,
    SiteNavBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [
    HomeGuardService,
    ProfileService,
  ],
  exports: [
    SiteNavBarComponent,
  ]
})
export class SharedModule { }
