import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-program-details',
  templateUrl: './client-program-details.component.html',
  styleUrls: ['./client-program-details.component.scss']
})
export class ClientProgramDetailsComponent implements OnInit {
  public activeTab: string = 'program-materials';
  public clientId: string;
  public programId: string;
  public generatedUrl: string;
  public program: Observable<any>;
  public page = 0;
  public resultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public topSubjects: Observable<any>;

  constructor(
    public service: AdminService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clientId = params['cid'];
      this.programId = params['pid'];
      this.program = this.service.getProgramDetails(this.programId, this.clientId);
      this.program.subscribe(data => {
        console.log(data);
      });
      this.topSubjects = this.service.getTopSubjects(this.programId, this.page, this.resultCount);
      this.generatedUrl = `${window.location.protocol}//${window.location.host}/programs/${this.programId}`;
    });
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.topSubjects = this.service.getTopSubjects(this.programId, this.page, this.resultCount);
  }

  public copyToClipboard() {
    let copyListener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.generatedUrl);
      e.preventDefault();
      document.removeEventListener('copy', copyListener);
    }
    document.addEventListener('copy', copyListener);
    document.execCommand('copy');
  }
}
