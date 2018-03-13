import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public toggle: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  showPrograms() {
    this.toggle = true;
  }

  showRequests() {
    this.toggle = false;
  }
}
