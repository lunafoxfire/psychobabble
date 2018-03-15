import { Component, OnInit } from '@angular/core';
import { AudioRecorderService } from './audio-recorder.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.scss']
})
export class AudioRecorderComponent implements OnInit {
  public isRecordingSupported: boolean;
  public recordingUrl: SafeUrl = null;

  constructor(
    public recorder: AudioRecorderService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isRecordingSupported = this.recorder.isRecordingSupported;
  }

  public startRecord(recordingslist) {
    this.recorder.startSession((arrayBuffer) => {
      let blob = new Blob([arrayBuffer], { type: 'audio/wav' });
      console.log(blob);
      this.recordingUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    });
  }

  public stopRecord() {
    this.recorder.endSession();
  }
}
