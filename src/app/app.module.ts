import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

// Route components
import { SplashComponent } from './routes/splash/splash.component';
import { LogInComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { VideoComponent } from './routes/video/video.component';
import { ProgramComponent } from './routes/program/program.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

// Shared components
import { SiteNavBarComponent } from './_shared/site-nav-bar/site-nav-bar.component';

// Test components
import { ApiCallTestComponent } from './test/api-call-test/api-call-test.component';
import { AuthTestComponent } from './test/auth-test/auth-test.component';

// Services
import { AuthService } from './auth.service';
import { VerifyComponent } from './routes/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LogInComponent,
    RegisterComponent,
    VideoComponent,
    ProgramComponent,
    NotFoundComponent,
    SiteNavBarComponent,
    ApiCallTestComponent,
    AuthTestComponent,
    VerifyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
