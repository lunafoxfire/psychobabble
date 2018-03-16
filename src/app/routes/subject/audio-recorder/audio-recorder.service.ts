import { Injectable } from '@angular/core';
import * as Recorder from './../../../../assets/js/recorder/recorder.min.js';

@Injectable()
export class AudioRecorderService {
  public isRecordingSupported: boolean;
  private recorder;
  private isRecording: boolean = false;

  constructor() {
    let config = {
      encoderPath: './assets/js/recorder/waveWorker.min.js',
      recordingGain: 1,
      monitorGain: 0,
      numberOfChannels: 1,
      bufferLength: 4096,
      waveBitDepth: 16,
      leaveStreamOpen: false,
      mediaTrackConstraints: true,
    }
    this.recorder = new Recorder(config);
    this.isRecordingSupported = Recorder.isRecordingSupported() ? true : false;
  }

  public getIsRecording(): boolean {
    return this.isRecording;
  }

  public startSession(callback: {(arrayBuffer: any): void}) {
    if (!this.isRecording) {
      this.recorder.start();
      this.isRecording = true;
      this.recorder.ondataavailable = callback;
    }
  }

  public endSession() {
    if (this.isRecording) {
      this.recorder.stop();
      this.isRecording = false;
    }
  }
}
