import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../admin.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'request-feed',
  templateUrl: './request-feed.component.html',
  styleUrls: ['./request-feed.component.scss']
})
export class RequestFeedComponent implements OnInit {
  public requests: Observable<any>;
  public page = 0;
  public resultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public searchTerm: string;
  constructor(
    public service: AdminService
  ) { }

  ngOnInit() {
    this.requests = this.service.getAllRequests(this.page, this.resultCount);
  }

  public searchRequests(searchTerm) {
    this.searchTerm = searchTerm.value;
    this.requests = this.service.getAllRequests(this.page, this.resultCount, this.searchTerm);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.requests = this.service.getAllRequests(this.page, this.resultCount, this.searchTerm);
  }
}
