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
  constructor(
    public service: ClientService
  ) { }

  ngOnInit() {
    this.requests = this.service.getClientRequests(this.page, this.resultCount);
  }
}
