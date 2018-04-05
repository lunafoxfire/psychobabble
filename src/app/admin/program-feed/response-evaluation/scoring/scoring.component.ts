import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.scss']
})
export class ScoringComponent implements OnInit {
  public programId: string;
  public subjectId: string;
  public responses: Observable<any>;
  constructor(
    public service: AdminService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['pid'];
      this.subjectId = params['sid'];
      this.responses = this.service.getSubjectResponses(this.programId, this.subjectId);
    });
  }

  public scoreResponse(score, responseId) {
    this.service.scoreResponse(score.value, responseId).subscribe(() => {
      this.responses = this.service.getSubjectResponses(this.programId, this.subjectId);
    });
  }
}
