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

  constructor(
    public service: ClientService
  ) { }

  ngOnInit() {
    this.programs = this.service.getClientPrograms();
    this.programs.subscribe((data) => {
      console.log(data);
    })
  }

}
