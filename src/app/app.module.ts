import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

// General routes
import { SplashComponent } from './routes/splash/splash.component';
import { LogInComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { VideoComponent } from './routes/video/video.component';
import { ProgramComponent } from './routes/program/program.component';

// Admin routes
import { FeedComponent } from './routes/admin/feed/feed.component';
import { VideosComponent } from './routes/admin/videos/videos.component';
import { ClientsComponent } from './routes/admin/clients/clients.component';

// Client routes
import { PlaylistsComponent } from './routes/client/playlists/playlists.component';
import { RequestsComponent } from './routes/client/requests/requests.component';

// Error routes
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { UnauthorizedComponent } from './routes/unauthorized/unauthorized.component';

// Shared components
import { SiteNavBarComponent } from './_shared/site-nav-bar/site-nav-bar.component';

// Test components
import { ApiCallTestComponent } from './test/api-call-test/api-call-test.component';
import { AuthTestComponent } from './test/auth-test/auth-test.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LogInComponent,
    RegisterComponent,
    VideoComponent,
    ProgramComponent,
    FeedComponent,
    VideosComponent,
    ClientsComponent,
    PlaylistsComponent,
    RequestsComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    SiteNavBarComponent,
    ApiCallTestComponent,
    AuthTestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
