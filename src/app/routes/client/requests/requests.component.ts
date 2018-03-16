import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClientService } from './../client.service';

@Component({
  selector: 'programs',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(
    public service: ClientService
  ) { }

  ngOnInit() {
  }

}
