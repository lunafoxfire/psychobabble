import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'api-call-test',
  templateUrl: './api-call-test.component.html',
  styleUrls: ['./api-call-test.component.scss']
})
export class ApiCallTestComponent implements OnInit {
  private testApiCallText: string;
  private testDbQueryTime: string;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // TODO: Call should be made in a service, this is just a quick test
    // https://angular.io/guide/http
    this.http.get("/api/test")
      .subscribe(data => {
        console.log(data);
        this.testApiCallText = data["message"];
      });
    }

    queryClick() {
      this.http.get("/api/test/db-time-query")
        .subscribe(data => {
          console.log(data);
          this.testDbQueryTime = data["message"];
        });
    }

    failClick() {
      this.http.get("/api/test/fakeroute/aaaaaaaaaaaaaaaaa")
        .subscribe(data => {
          console.log("fail request");
        });
    }
}
