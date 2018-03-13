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
    this.softSkills = this.service.getSkills();
  }

  public submitRequest(form) {
    console.log(form.value);
    let nameArray = new Array<string>();
    Object.keys(form.value).forEach(function(key) {
      if(form.value[key]) {
        if(key === "details") {
          nameArray.push(form.value[key]);
        } else {
          nameArray.push(key);
        }
      }
    });
    console.log(nameArray);
    this.service.makeRequest({nameArray: nameArray}).subscribe((data) => {
      console.log(data);
    })
  }
}
