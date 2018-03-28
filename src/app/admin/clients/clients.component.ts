import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../admin.service';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public clients: Observable<any>;
  public page = 0;
  public resultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public searchTerm: string;

  constructor(
    public service: AdminService
  ) { }

  ngOnInit() {
    this.clients = this.service.getClients(this.page, this.resultCount);
  }

  searchClients(searchTerm) {
    this.searchTerm = searchTerm.value;
    this.clients = this.service.getClients(this.page, this.resultCount, this.searchTerm);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.clients = this.service.getClients(this.page, this.resultCount, this.searchTerm);
  }
}
