import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { AuthService } from './auth.service';
import { TimedRedirectService } from './timed-redirect.service';
import { VideoService } from './routes/admin/videos/video.service';
import { FeedService } from './routes/admin/feed/feed.service';
import { ClientService } from './routes/client/client.service';

// Route guards
import { AuthGuardService } from './auth-guard.service';
import { HomeGuardService } from './home-guard.service';
import { LoginGuardService } from './login-guard.service';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

// General routes
import { SplashComponent } from './routes/splash/splash.component';
import { LogInComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { VideoUploadComponent } from './routes/admin/videos/video-upload/video-upload.component';
import { VerifyComponent } from './routes/verify/verify.component';
import { ResetComponent } from './routes/reset/reset.component';
import { ChangePasswordComponent } from './routes/change-password/change-password.component';

// Admin routes
import { FeedComponent } from './routes/admin/feed/feed.component';
import { VideosComponent } from './routes/admin/videos/videos.component';
import { ClientsComponent } from './routes/admin/clients/clients.component';

// Client routes
import { ProgramsComponent } from './routes/client/programs/programs.component';
import { RequestsComponent } from './routes/client/requests/requests.component';

// Error routes
import { NotFoundComponent } from './routes/error/not-found/not-found.component';
import { UnauthorizedComponent } from './routes/error/unauthorized/unauthorized.component';
import { AlreadyLoggedInComponent } from './routes/error/already-logged-in/already-logged-in.component';

// Shared components
import { SiteNavBarComponent } from './_shared/site-nav-bar/site-nav-bar.component';
import { UsernameValidatorDirective, EmailValidatorDirective, PasswordValidatorDirective } from './form-validator.directive';
import { ProgramDesignComponent } from './routes/admin/feed/program-design/program-design.component';
import { ResponseEvaluationComponent } from './routes/admin/feed/response-evaluation/response-evaluation.component';
import { EvaluationComponent } from './routes/subject/evaluation/evaluation.component';
import { RegisterLoginComponent } from './routes/subject/register-login/register-login.component';
import { SubjectVerificationComponent } from './routes/subject/subject-verification/subject-verification.component';

// Imported modules
import { MaterialModule } from './_imports/material.module';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LogInComponent,
    RegisterComponent,
    VideoUploadComponent,
    FeedComponent,
    VideosComponent,
    ClientsComponent,
    ProgramsComponent,
    RequestsComponent,
    NotFoundComponent,
    AlreadyLoggedInComponent,
    UnauthorizedComponent,
    SiteNavBarComponent,
    VerifyComponent,
    ResetComponent,
    ChangePasswordComponent,
    UsernameValidatorDirective,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    ProgramDesignComponent,
    ResponseEvaluationComponent,
    EvaluationComponent,
    RegisterLoginComponent,
    SubjectVerificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    AuthService,
    VideoService,
    TimedRedirectService,
    AuthGuardService,
    HomeGuardService,
    LoginGuardService,
    FeedService,
    ClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
