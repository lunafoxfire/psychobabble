import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-api-call-test',
  templateUrl: './api-call-test.component.html',
  styleUrls: ['./api-call-test.component.scss']
})
export class ApiCallTestComponent implements OnInit {
  private callResponse: Observable<string>;
  private queryResponse: Observable<string>;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // TODO: Call should be made in a service, this is just a quick test
    this.callResponse = this.http.get("/api/test", {responseType: 'text'});

    // .subscribe to unwrap observable
    this.callResponse
      .subscribe(data => {
        console.log(data);
      });
    }

    queryClick() {
      this.queryResponse = this.http.get("/api/test/db-time-query", {responseType: 'text'});
    }
}
