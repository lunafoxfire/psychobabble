import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClientService } from './../client.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  public programs: Observable<any>;
  public page = 0;
  public resultCount = 10;
  public pageSizeOptions = [1, 5, 10, 25, 50, 100];
  public searchTerm: string;

  constructor(
    public service: ClientService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.programs = this.service.getClientPrograms(this.page, this.resultCount);
  }

  public searchPrograms(searchTerm) {
    this.searchTerm = searchTerm.value;
    this.programs = this.service.getClientPrograms(this.page, this.resultCount, this.searchTerm);
  }

  public nextPage(pageEvent) {
    this.page = pageEvent.pageIndex;
    this.resultCount = pageEvent.pageSize;
    this.programs = this.service.getClientPrograms(this.page, this.resultCount, this.searchTerm);
  }

  public openDialog(jobTitle: string, programId: string, event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ProgramCloseDialogComponent, {
      width: '250px',
      data: { jobTitle: jobTitle, programId: programId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.service.closeProgram(result).subscribe(data => {
          console.log(data);
          location.reload();
        });
      }
    });
  }
}

@Component({
  selector: 'program-close-dialog',
  templateUrl: './program-close-dialog.html',
})
export class ProgramCloseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProgramCloseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
