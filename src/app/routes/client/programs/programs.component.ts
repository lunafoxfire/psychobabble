import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClientService } from './../client.service';

@Component({
  selector: 'programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  public programs: Observable<any>;
  public page: number = 0;
  public resultCount: number = 10;
  constructor(
    public service: ClientService
  ) { }

  ngOnInit() {
    this.programs = this.service.getClientPrograms(this.page, this.resultCount);
  }

  public searchPrograms(searchTerm) {
    this.programs = this.service.getClientPrograms(this.page, this.resultCount, searchTerm.value);
  }
}
