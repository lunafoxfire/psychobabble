import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from './evaluation.service';

@Component({
  selector: 'evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  public programId: string;
  @ViewChild('evalVideo') videoElement;
  public video: Observable<any>;
  public state: EvalState;

  constructor(
    public evalService: EvaluationService,
    public route: ActivatedRoute
  ) {
    this.state = EvalState.Initial;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.state = EvalState.LoadingVideo;
      this.programId = params.id;
      this.video = this.evalService.getCurrentVideo(this.programId);
    });

    this.video.subscribe((video) => {
      this.state = EvalState.AwaitingPlay;
    });
  }

  public playVideo() {
    if (this.state === EvalState.AwaitingPlay) {
      this.videoElement.nativeElement.play();
      this.state = EvalState.Playing;
    }
  }

  public videoEnd() {
    this.state = EvalState.AwaitingRecord;
  }

  public disableRightClick() {
    return false;
  }

  public startRecording() {
    this.state = EvalState.Recording;
  }

  public endRecording() {
    this.state = EvalState.GetNextVideo;
  }
}

enum EvalState {
  Initial =  'initial',
  LoadingVideo = 'loading-video',
  AwaitingPlay = 'awaiting-play',
  Playing = 'playing',
  AwaitingRecord = 'awaiting-record',
  Recording = 'recording',
  GetNextVideo = 'get-next-video',
  Done = 'done'
}
