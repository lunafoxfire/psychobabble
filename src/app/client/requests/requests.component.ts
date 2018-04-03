import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClientService } from './../client.service';

@Component({
  selector: 'programs',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requests: Observable<any>;
  public page: number = 0;
  public resultCount: number = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public searchTerm: string;

  constructor(
    public service: ClientService
  ) { }

  ngOnInit() {
    this.requests = this.service.getClientRequests(this.page, this.resultCount);
    this.requests.subscribe(data => {
      console.log(data);
    })
  }

  public searchRequests(searchTerm) {
    this.searchTerm = searchTerm.value;
    this.requests = this.service.getClientRequests(this.page, this.resultCount, this.searchTerm);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.requests = this.service.getClientRequests(this.page, this.resultCount, this.searchTerm);
  }
}
