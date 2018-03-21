import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../admin.service';
import { PageEvent } from '@angular/material';

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
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];

  constructor(
    public service: AdminService
  ) { }

  ngOnInit() {
    this.programs = this.service.getAllPrograms(this.page, this.resultCount);
    this.requests = this.service.getAllRequests(this.page, this.resultCount);
  }

  public showPrograms() {
    this.toggle = true;
    this.page = 0;
    this.programs = this.service.getAllPrograms(this.page, this.resultCount);
  }

  public showRequests() {
    this.toggle = false;
    this.page = 0;
    this.requests = this.service.getAllRequests(this.page, this.resultCount);
  }

  public searchRequests(searchTerm) {
    this.requests = this.service.getAllRequests(this.page, this.resultCount, searchTerm.value);
  }

  public searchPrograms(searchTerm) {
    this.programs = this.service.getAllPrograms(this.page, this.resultCount, searchTerm.value);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    if(this.toggle) {
      this.programs = this.service.getAllPrograms(this.page, this.resultCount);
    } else {
      this.requests = this.service.getAllRequests(this.page, this.resultCount);
    }
  }
}
