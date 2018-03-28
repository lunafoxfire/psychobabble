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
  public programPage = 0;
  public requestPage = 0;
  public programResultCount = 10;
  public requestResultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public programSearchTerm: string;
  public requestSearchTerm: string;
  constructor(
    public service: AdminService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      const parameters = {
        clientId: this.clientId,
        programPage: this.programPage,
        requestPage: this.requestPage,
        programResultCount: this.programResultCount,
        requestResultCount: this.requestResultCount
      } as GetClientDetailsParameters;
      this.client = this.service.getClientDetails(parameters);
    });
  }

  public searchPrograms(searchTerm) {
    this.programSearchTerm = searchTerm.value;
    const parameters = {
      clientId: this.clientId,
      programPage: this.programPage,
      requestPage: this.requestPage,
      programResultCount: this.programResultCount,
      requestResultCount: this.requestResultCount,
      programSearchTerm: this.programSearchTerm,
    } as GetClientDetailsParameters;
    this.client = this.service.getClientDetails(parameters);
  }

  public searchRequests(searchTerm) {
    this.requestSearchTerm = searchTerm.value;
    const parameters = {
      clientId: this.clientId,
      programPage: this.programPage,
      requestPage: this.requestPage,
      programResultCount: this.programResultCount,
      requestResultCount: this.requestResultCount,
      requestSearchTerm: this.requestSearchTerm,
    } as GetClientDetailsParameters;
    this.client = this.service.getClientDetails(parameters);
  }

  public nextProgramPage(pageEvent) {
    this.programPage = pageEvent.pageIndex;
    this.programResultCount = pageEvent.pageSize;
    const parameters = {
      clientId: this.clientId,
      programPage: this.programPage,
      requestPage: this.requestPage,
      programResultCount: this.programResultCount,
      requestResultCount: this.requestResultCount,
      requestSearchTerm: this.requestSearchTerm,
      programSearchTerm: this.programSearchTerm,
    } as GetClientDetailsParameters;
    this.client = this.service.getClientDetails(parameters);
  }

  public nextRequestPage(pageEvent) {
    this.requestPage = pageEvent.pageIndex;
    this.requestResultCount = pageEvent.pageSize;
    const parameters = {
      clientId: this.clientId,
      programPage: this.programPage,
      requestPage: this.requestPage,
      programResultCount: this.programResultCount,
      requestResultCount: this.requestResultCount,
      requestSearchTerm: this.requestSearchTerm,
      programSearchTerm: this.programSearchTerm,
    } as GetClientDetailsParameters;
    this.client = this.service.getClientDetails(parameters);
  }
}
