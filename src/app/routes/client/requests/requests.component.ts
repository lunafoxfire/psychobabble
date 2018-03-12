import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from './requests.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public softSkills: Observable<any>;

  constructor(
    public http: HttpClient,
    public service: RequestsService
  ) { }

  ngOnInit() {
    this.getSoftSkills();
  }

  private getSoftSkills() {
    this.softSkills = this.service.getSkills();
  }

}
