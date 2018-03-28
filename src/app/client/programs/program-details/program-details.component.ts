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
  public topSubjects: Observable<any>;

  constructor(
    private service: ClientService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.program = this.service.getProgramDetails(this.programId);
      this.topSubjects = this.service.getTopSubjects(this.programId);
      this.generatedUrl = `${window.location.protocol}//${window.location.host}/programs/${this.programId}`;
    });
  }

}
