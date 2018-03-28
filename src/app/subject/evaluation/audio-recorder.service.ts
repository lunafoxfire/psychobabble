import { Injectable } from '@angular/core';
import * as Recorder from '../../../assets/js/recorder/recorder.min.js';

@Injectable()
export class AudioRecorderService {
  public isRecordingSupported: boolean;
  private recorder;
  private isRecording: boolean = false;

  constructor() {
    const config = {
      encoderPath: './assets/js/recorder/waveWorker.min.js',
      recordingGain: 1,
      monitorGain: 0,
      numberOfChannels: 1,
      bufferLength: 4096,
      waveBitDepth: 16,
      leaveStreamOpen: false,
      mediaTrackConstraints: true,
    };
    this.recorder = new Recorder(config);
    this.isRecordingSupported = Recorder.isRecordingSupported() ? true : false;
  }

  public getIsRecording(): boolean {
    return this.isRecording;
  }

  public startSession() {
    if (!this.isRecording) {
      this.recorder.start();
      this.isRecording = true;
    }
  }

  /** Returns a promise containing the recorded data as an arrayBuffer */
  public endSession(): Promise<any> {
    if (this.isRecording) {
      this.recorder.stop();
      this.isRecording = false;
      return new Promise((resolve, reject) => {
        this.recorder.ondataavailable = (arrayBuffer) => {
          resolve(arrayBuffer);
        };
      });
    }
    return null;
  }
}
