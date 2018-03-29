import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
  <header>
    <!-- <site-nav-bar></site-nav-bar> -->
  </header>
  <div class="page-body">
    <router-outlet></router-outlet>
  <div>
  <footer>
    <site-footer></site-footer>
  </footer>
  `
})
export class AppComponent { }
