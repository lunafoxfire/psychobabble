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
  public page: number = 0;
  public resultCount: number = 10;

  constructor(
    public service: AdminService
  ) { }

  ngOnInit() {
    this.clients = this.service.getClients(this.page, this.resultCount);
    this.clients.subscribe((data) => {
      console.log(data);
    })
  }

}
