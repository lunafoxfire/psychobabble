import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { zip } from 'rxjs/observable/zip';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from './evaluation.service';

@Component({
  selector: 'evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  @ViewChild('evalVideo') videoElement;
  public programId: Observable<string>;
  public currentVideo: Observable<Video>;
  public state: EvalState;

  constructor(
    public evalService: EvaluationService,
    public route: ActivatedRoute
  ) {
    this.state = EvalState.Initial;
    // Extract programId as observable from route params observable
    this.programId = Observable.create((observer) => {
      this.route.params.subscribe((params) => {
        observer.next(params.id);
      });
    });
  }

  ngOnInit() {
    this.loadNextVideo();
  }

  public loadNextVideo() {
    this.programId.subscribe((programId) => {
      this.state = EvalState.LoadingVideo;
      // Extract curentVideo as an observable from getCurrentVideo response
      this.currentVideo = Observable.create((observer) => {
        this.evalService.getCurrentVideo(programId).subscribe((data) => {
          observer.next(data.video);
          this.state = EvalState.AwaitingPlay;
        });
      });
    });
  }

  public playVideo() {
    if (this.state === EvalState.AwaitingPlay) {
      zip(this.programId, this.currentVideo).subscribe((zippedData) => {
        let programId = zippedData[0];
        let videoId = zippedData[1].id;
        // Begin video playback after response process has successfully started
        this.evalService.beginResponseProcess(programId, videoId).subscribe((data) => {
          console.log(data);
          this.videoElement.nativeElement.play();
          this.state = EvalState.Playing;
        });
      });
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

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
}
