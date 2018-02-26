import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-api-call-test',
  templateUrl: './api-call-test.component.html',
  styleUrls: ['./api-call-test.component.scss']
})
export class ApiCallTestComponent implements OnInit {
  private testApiCallText: Observable<string>;
  private testDbQueryTime: Observable<string>;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // TODO: Call should be made in a service, this is just a quick test
    this.testApiCallText = this.http.get("/api/test", {responseType: 'text'});

    // .subscribe to unwrap observable
    this.testApiCallText
      .subscribe(data => {
        console.log(data);
      });
    }

    queryClick() {
      this.testDbQueryTime = this.http.get("/api/test/db-time-query", {responseType: 'text'});
    }
}
