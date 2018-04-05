import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './shared.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../_imports/material.module';

import { SplashComponent } from './home/splash/splash.component';
import { ProfileComponent } from './profile/profile.component';
import { SiteNavBarComponent } from './site-nav-bar/site-nav-bar.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { FormCardComponent } from './forms/form-card/form-card.component';
import { FormCardLiteComponent } from './forms/form-card-lite/form-card-lite.component';
import { FormHeaderComponent } from './forms/form-header/form-header.component';
import { FormContentComponent } from './forms/form-content/form-content.component';
import { FormSubmitButtonComponent } from './forms/form-submit-button/form-submit-button.component';

import { EaseScrollDirective, ParallaxDirective } from './parallax.directives';

import { HomeGuardService } from './home/home-guard.service';
import { ProfileService } from './profile/profile.service';
import { SiteNavBarService } from './site-nav-bar/site-nav-bar.service';

@NgModule({
  declarations: [
    SplashComponent,
    ProfileComponent,
    SiteNavBarComponent,
    SiteFooterComponent,
    EaseScrollDirective,
    ParallaxDirective,
    FormCardComponent,
    FormHeaderComponent,
    FormContentComponent,
    FormSubmitButtonComponent,
    FormCardLiteComponent,
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
    SiteNavBarService,
  ],
  exports: [
    SiteNavBarComponent,
    SiteFooterComponent,
    EaseScrollDirective,
    ParallaxDirective,
    FormCardComponent,
    FormHeaderComponent,
    FormContentComponent,
    FormSubmitButtonComponent,
    FormCardLiteComponent,
  ]
})
export class SharedModule { }
