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

  constructor(
    public service: AdminService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
