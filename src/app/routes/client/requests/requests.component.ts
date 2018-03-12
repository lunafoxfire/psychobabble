import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from './requests.service';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public softSkills: any[];

  constructor(
    public http: HttpClient,
    public service: RequestsService
  ) { }

  ngOnInit() {
  }

  private getSoftSkills() {
    this.service.getSkills().subscribe((data) => {
      console.log(data);
    });
  }

}
