import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClientService } from './../client.service';
import { MatDialog } from '@angular/material';
import { MakeRequestComponent } from './make-request/make-request.component';

@Component({
  selector: 'programs',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public requests: Observable<any>;
  public page: number = 0;
  public resultCount: number = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public searchTerm: string;

  constructor(
    public service: ClientService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.requests = this.service.getClientRequests(this.page, this.resultCount);
    this.requests.subscribe(data => {
      console.log(data);
    })
  }

  public searchRequests(searchTerm) {
    this.searchTerm = searchTerm.value;
    this.requests = this.service.getClientRequests(this.page, this.resultCount, this.searchTerm);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.requests = this.service.getClientRequests(this.page, this.resultCount, this.searchTerm);
  }

  public openDialog(event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(MakeRequestComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.closeProgram(result).subscribe(data => {
          location.reload();
        });
      }
    });
  }
}
