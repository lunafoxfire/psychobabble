import { Component, OnInit, ViewChild } from '@angular/core';
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
  public toggle: boolean = false;

  @ViewChild('myVideo') myVideo: any;
  played: boolean;

  constructor(
    private service: SubjectService,
    public route: ActivatedRoute,
    public roter: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.video = this.service.getCurrentVideo(this.programId);
    });
  }

  public playVideo() {
    if(!this.played) {
      this.played = true;
      let video = this.myVideo.nativeElement;
      video.play();
    }
  }

  public videoEnd() {
    this.toggle = true;
  }

  public disableRightClick() {
    return false;
  }
}
