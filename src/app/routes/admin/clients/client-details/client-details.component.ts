import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService, GetClientDetailsParameters } from './../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  public client: Observable<any>;
  public clientId: string;
  public programPage: number = 0;
  public requestPage: number = 0;
  public resultCount: number = 10;

  constructor(
    public service: AdminService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      let parameters = {
        clientId: this.clientId,
        programPage: this.programPage,
        requestPage: this.requestPage,
        resultCount: this.resultCount,
      } as GetClientDetailsParameters;
      this.client = this.service.getClientDetails(parameters);
    })
  }

  public programSearch(searchTerm) {
    let parameters = {
      clientId: this.clientId,
      programPage: this.programPage,
      requestPage: this.requestPage,
      resultCount: this.resultCount,
      programSearchTerm: searchTerm.value,
    } as GetClientDetailsParameters;
    this.client = this.service.getClientDetails(parameters);
  }

  public requestSearch(searchTerm) {
    let parameters = {
      clientId: this.clientId,
      programPage: this.programPage,
      requestPage: this.requestPage,
      resultCount: this.resultCount,
      requestSearchTerm: searchTerm.value,
    } as GetClientDetailsParameters;
    this.client = this.service.getClientDetails(parameters);
  }
}
