import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../admin.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'program-feed',
  templateUrl: './program-feed.component.html',
  styleUrls: ['./program-feed.component.scss']
})
export class ProgramFeedComponent implements OnInit {
  public programs: Observable<any>;
  public page = 0;
  public resultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public searchTerm: string;

  constructor(
    public service: AdminService
  ) { }

  ngOnInit() {
    this.programs = this.service.getAllPrograms(this.page, this.resultCount);
  }

  public searchPrograms(searchTerm) {
    this.searchTerm = searchTerm.value;
    this.programs = this.service.getAllPrograms(this.page, this.resultCount, this.searchTerm);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.programs = this.service.getAllPrograms(this.page, this.resultCount, this.searchTerm);
  }
}
