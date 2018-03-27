import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { AuthService } from './auth.service';
import { RegisterService } from './routes/register/register.service';
import { TimedRedirectService } from './timed-redirect.service';
import { VideoService } from './routes/admin/videos/video.service';
import { AdminService } from './routes/admin/admin.service';
import { ClientService } from './routes/client/client.service';
import { SubjectService } from './routes/subject/subject.service';
import { AudioRecorderService } from './routes/subject/evaluation/audio-recorder.service';
import { EvaluationService } from './routes/subject/evaluation/evaluation.service';
import { ProfileService } from './routes/profile/profile.service';

// Route guards
import { AuthGuardService } from './auth-guard.service';
import { HomeGuardService } from './home-guard.service';
import { LoginGuardService } from './login-guard.service';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { ResponseGuardService } from './response-guard.service';
import { VerifyGuardService } from './verify-guard.service';

// Validators
import { UsernameValidatorDirective, PasswordValidatorDirective } from './form-validator.directive';

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
import { ClientDetailsComponent } from './routes/admin/clients/client-details/client-details.component';
import { ClientProgramDetailsComponent } from './routes/admin/clients/client-details/client-program-details/client-program-details.component';

// Client routes
import { ProgramsComponent } from './routes/client/programs/programs.component';
import { RequestsComponent } from './routes/client/requests/requests.component';
import { MakeRequestComponent } from './routes/client/requests/make-request/make-request.component';
import { ProgramDetailsComponent } from './routes/client/programs/program-details/program-details.component';
import { RequestDetailsComponent } from './routes/client/requests/request-details/request-details.component';

// Subject routes
import { EvaluationComponent } from './routes/subject/evaluation/evaluation.component';

// Error routes
import { NotFoundComponent } from './routes/error/not-found/not-found.component';
import { UnauthorizedComponent } from './routes/error/unauthorized/unauthorized.component';
import { AlreadyLoggedInComponent } from './routes/error/already-logged-in/already-logged-in.component';

// Shared components
import { SiteNavBarComponent } from './_shared/site-nav-bar/site-nav-bar.component';
import { ProgramDesignComponent } from './routes/admin/feed/program-design/program-design.component';
import { ResponseEvaluationComponent } from './routes/admin/feed/response-evaluation/response-evaluation.component';
import { ProfileComponent } from './routes/profile/profile.component';

// Imported modules
import { MaterialModule } from './_imports/material.module';
import { ScoringComponent } from './routes/admin/feed/response-evaluation/scoring/scoring.component';
import { NewAdminComponent } from './routes/new-admin/new-admin.component';

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
    PasswordValidatorDirective,
    ProgramDesignComponent,
    ResponseEvaluationComponent,
    EvaluationComponent,
    ProgramDetailsComponent,
    MakeRequestComponent,
    RequestDetailsComponent,
    ClientDetailsComponent,
    ClientProgramDetailsComponent,
    ProfileComponent,
    ScoringComponent,
    NewAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    AuthService,
    RegisterService,
    VideoService,
    TimedRedirectService,
    AuthGuardService,
    HomeGuardService,
    LoginGuardService,
    AdminService,
    ClientService,
    ResponseGuardService,
    VerifyGuardService,
    SubjectService,
    AudioRecorderService,
    EvaluationService,
    ProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
