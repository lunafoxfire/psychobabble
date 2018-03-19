import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-program-details',
  templateUrl: './client-program-details.component.html',
  styleUrls: ['./client-program-details.component.scss']
})
export class ClientProgramDetailsComponent implements OnInit {
  public clientId: string;
  public programId: string;
  public generatedUrl: string;
  public program: Observable<any>;

  constructor(
    public service: AdminService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['cid'];
      this.programId = params['pid'];
      this.program = this.service.getProgramDetails(this.programId, this.clientId);
      this.program.subscribe(data => {
        console.log(data);
      })
      this.generatedUrl = `${window.location.protocol}//${window.location.host}/programs/${this.programId}`;
    })
  }

}
