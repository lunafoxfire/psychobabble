import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-request-details',
  templateUrl: './client-request-details.component.html',
  styleUrls: ['./client-request-details.component.scss']
})
export class ClientRequestDetailsComponent implements OnInit {
  public clientId: string;
  public requestId: string;
  public request: Observable<any>;

  constructor(
    public service: AdminService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['cid'];
      this.requestId = params['rid'];
      this.request = this.service.getClientRequestDetails(this.requestId);
      this.request.subscribe(data => {
        console.log(data);
      })
    })
  }

}
