import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClientService } from './../client.service';

@Component({
  selector: 'programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  public programs: Observable<any>;
  public page: number = 0;
  public resultCount: number = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public searchTerm: string;

  constructor(
    public service: ClientService
  ) { }

  ngOnInit() {
    this.programs = this.service.getClientPrograms(this.page, this.resultCount);
  }

  public searchPrograms(searchTerm) {
    this.searchTerm = searchTerm.value
    this.programs = this.service.getClientPrograms(this.page, this.resultCount, this.searchTerm);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.programs = this.service.getClientPrograms(this.page, this.resultCount, this.searchTerm);
  }
}
