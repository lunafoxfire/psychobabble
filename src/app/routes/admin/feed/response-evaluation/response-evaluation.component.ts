import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'response-evaluation',
  templateUrl: './response-evaluation.component.html',
  styleUrls: ['./response-evaluation.component.scss']
})
export class ResponseEvaluationComponent implements OnInit {
  public subjects: Observable<any>;
  public programId: string;
  constructor(
    public service: AdminService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.subjects = this.service.getProgramSubjects(this.programId);
    });
  }
}
