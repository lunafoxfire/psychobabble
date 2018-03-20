import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EvaluationService } from './evaluation.service';
import { AudioRecorderService } from './audio-recorder.service';
import { AuthService } from '../../../auth.service';

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
    public route: ActivatedRoute,
    public http: HttpClient,
    public auth: AuthService
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
        // Extract currentResponseId as observable from beginResponseProcess response
        this.currentResponseId = Observable.create((observer) => {
          this.evalService.beginResponseProcess(programId, videoId).subscribe((data) => {
            observer.next(data.responseId);
          });
        });
        // Begin video playback after response process has successfully started
        this.currentResponseId.subscribe((responseId) => {
          this.videoElement.nativeElement.play();
          this.state = EvalState.Playing;
        })
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
      this.recorder.endSession()
        .then((arrayBuffer) => {
          this.state = EvalState.FinalizeResponse;
          let audioFile = new File([arrayBuffer], 'tmp.wav', { type: 'audio/wav' });
          this.currentResponseId.subscribe((responseId) => {
            this.evalService.generateAudioUrl(responseId)
              .subscribe((data) => {
                const httpOptions = {
                  headers: new HttpHeaders({
                    "Key": data.aws.key,
                    "ACL": data.aws.acl,
                    "Bucket": data.aws.bucket,
                    "Content-Type": data.aws.contentType
                  })
                };
                this.http.put(data.aws.signedUrl, audioFile, httpOptions)
                  .subscribe((result) => {
                    this.auth.post(`/api/responses/save-success`, responseId)
                      .subscribe((response) => {
                        this.responseSuccess();
                      });
                  }, (error) => {
                    this.auth.post(`/api/responses/save-failed`, responseId)
                      .subscribe((response) => {
                        this.responseSuccess();
                      });
                  });
              });
          });
        });
    }
  }

  public responseSuccess() {
    console.log('YEY');
  }

  public responseFailure() {
    console.log('BOO');
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

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
}
