import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from './../subject.service';

@Component({
  selector: 'evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  public video: Observable<any>;
  public programId: string;

  constructor(
    private service: SubjectService,
    public route: ActivatedRoute,
    public roter: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.service.getCurrentVideo(this.programId);
    });
  }

}
