import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './../../client.service';

@Component({
  selector: 'request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  public request: Observable<any>;
  public requestId: string;

  constructor(
    private service: ClientService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.requestId = params['id'];
      this.request = this.service.getRequestDetails(this.requestId);
    })
  }

}
