import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FeedService } from './feed.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public toggle: boolean = true;
  public programs: Observable<any>;
  public requests: Observable<any>;
  public page: number = 0;
  public resultCount: number = 10;

  constructor(
    public service: FeedService
  ) { }

  ngOnInit() {
    this.programs = this.service.getAllPrograms(this.page, this.resultCount);
    this.requests = this.service.getAllRequests(this.page, this.resultCount);
  }

  showPrograms() {
    this.toggle = true;
    this.page = 0;
    console.log(this.programs);
  }

  showRequests() {
    this.toggle = false;
    this.page = 0;
    console.log(this.requests);
  }
}
