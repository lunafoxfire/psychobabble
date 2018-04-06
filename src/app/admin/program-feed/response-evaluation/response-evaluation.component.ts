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
  public page = 0;
  public resultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];

  constructor(
    public service: AdminService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.subjects = this.service.getProgramSubjects(this.page, this.resultCount, this.programId);
      this.subjects.subscribe(data => {
        console.log(data);
      })
    });
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.subjects = this.service.getProgramSubjects(this.page, this.resultCount, this.programId);
  }
}
