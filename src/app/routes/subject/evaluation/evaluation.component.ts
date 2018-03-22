import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService, Video } from './evaluation.service';
import { AudioRecorderService } from './audio-recorder.service';

@Component({
  selector: 'evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  @ViewChild('evalVideo') videoElement;
  public programId: Observable<string>;
  public currentVideo: Observable<Video>;
  public currentResponseId: Observable<string>;
  public state: EvalState;

  constructor(
    public evalService: EvaluationService,
    public recorder: AudioRecorderService,
    public route: ActivatedRoute
  ) {
    this.state = EvalState.Initial;
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
      this.evalService.getCurrentVideo(programId).then((video) => {
        this.currentVideo = Observable.create((observer) => {
          observer.next(video);
        });
        if (!video) {
          this.playlistOver();
        }
      });
    });
  }

  public videoLoaded() {
    if (this.state === EvalState.LoadingVideo) {
      this.state = EvalState.AwaitingPlay;
    }
  }

  public playVideo() {
    if (this.state === EvalState.AwaitingPlay) {
      zip(this.programId, this.currentVideo).subscribe((zippedData) => {
        let programId = zippedData[0];
        let videoId = zippedData[1].id;
        this.evalService.beginResponseProcess(programId, videoId).then((newResponseId) => {
          this.currentResponseId = Observable.create((observer) => {
            observer.next(newResponseId);
          });
          this.videoElement.nativeElement.play();
          this.state = EvalState.Playing;
        });
      });
    }
  }

  public videoEnd() {
    if (this.state === EvalState.Playing) {
      this.state = EvalState.AwaitingRecord;
    }
  }

  public startRecording() {
    if (this.state === EvalState.AwaitingRecord) {
      this.recorder.startSession();
      this.state = EvalState.Recording;
    }
  }

  public stopRecording() {
    if (this.state === EvalState.Recording) {
      this.recorder.endSession().then((arrayBuffer) => {
        this.state = EvalState.FinalizeResponse;
        let audioFile = new File([arrayBuffer], 'tmp.wav', { type: 'audio/wav' });
        this.currentResponseId.subscribe((responseId) => {
          this.evalService.saveAudioToResponse(responseId, audioFile).then((result) => {
            if(result === true) {
              this.responseSaveSuccess()
            }
            else {
              this.responseSaveFailure();
            }
          });
        });
      });
    }
  }

  public responseSaveSuccess() {
    if (this.state === EvalState.FinalizeResponse) {
      this.state = EvalState.GetNextVideo;
      this.loadNextVideo();
    }
  }

  // TODO: Use this to show the user something
  public responseSaveFailure() {
    console.error('Something went wrong...');
  }

  // TODO: Use this method to provide a bit of buffer time before loading next video
  public getNextVideo() {
    if (this.state === EvalState.GetNextVideo) {
      this.loadNextVideo();
    }
  }

  public playlistOver() {
    if (this.state === EvalState.LoadingVideo) {
      this.state = EvalState.Done;
    }
  }
}

enum EvalState {
  Initial =  'initial',
  LoadingVideo = 'loading-video',
  AwaitingPlay = 'awaiting-play',
  Playing = 'playing',
  AwaitingRecord = 'awaiting-record',
  Recording = 'recording',
  FinalizeResponse = 'finalize-response',
  GetNextVideo = 'get-next-video',
  Done = 'done'
}
