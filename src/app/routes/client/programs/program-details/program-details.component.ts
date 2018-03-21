import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './../../client.service';

@Component({
  selector: 'program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {
  public program: Observable<any>;
  public programId: string;
  public generatedUrl: string;

  constructor(
    private service: ClientService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.program = this.service.getProgramDetails(this.programId);// TODO: Make this not pass down entire User
      this.program.subscribe(data => {
        console.log(data);
      })
      this.generatedUrl = `${window.location.protocol}//${window.location.host}/programs/${this.programId}`;
    })
  }

}
