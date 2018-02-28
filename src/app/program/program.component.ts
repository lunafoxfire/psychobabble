import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public Host = "Http://" + window.location.host;
  public id: Observable<string>;
  public url: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  genUrl() {
    this.http.get<string>("/api/test/pc").subscribe(data => {
      this.url = this.Host + "/program/" + data["message"];
    });
  }

}
