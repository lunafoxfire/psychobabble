import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  public client: Observable<any>;
  public clientId: string;

  constructor(
    public service: AdminService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.client = this.service.getClientDetails(this.clientId);
    })
  }

}
