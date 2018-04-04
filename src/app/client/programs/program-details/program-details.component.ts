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
  public page = 0;
  public resultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
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
      this.topSubjects = this.service.getTopSubjects(this.programId, this.page, this.resultCount);
      this.generatedUrl = `${window.location.protocol}//${window.location.host}/programs/${this.programId}`;
    });
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
