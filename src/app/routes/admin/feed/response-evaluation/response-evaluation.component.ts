import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../admin.service';

@Component({
  selector: 'response-evaluation',
  templateUrl: './response-evaluation.component.html',
  styleUrls: ['./response-evaluation.component.scss']
})
export class ResponseEvaluationComponent implements OnInit {
  public responses: Observable<any>;

  constructor(
    public service: AdminService
  ) { }

  ngOnInit() {
    this.responses;
  }

  public rateResponse(rating) {
    console.log("NOT IMPLEMENTED YET YOU BUGGER!!")
  }
}
