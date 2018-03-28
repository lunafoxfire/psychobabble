import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';


@Injectable()
export class EvaluationService {

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  /** Returns a new promise contatining the next video (or null if playlist is over). */
  public getCurrentVideo(programId: string): Promise<Video> {
    return new Promise((resolve, reject) => {
      this.auth.get<any>(`/api/programs/${programId}/get-video`).subscribe((data) => {
        const video = {
            id: '99edc7e1-4142-4268-87b8-16605b57157d',
            title: "Stats",
            url: "https://s3.amazonaws.com/epicodus-internship/Test-Folder/stats.mp4",
            description: null
          } as Video;
        if (video) {
          resolve(video);
        }
        else {
          resolve(null);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  /** Returns a promise containing the new response's id. */
  public beginResponseProcess(programId: string, videoId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reqBody = {
        programId: programId,
        videoId: videoId
      };
      this.auth.post<any>(`/api/responses/initialize`, reqBody).subscribe((response) => {
        resolve(response.responseId);
      }, (err) => {
        reject(err);
      });
    });
  }

  /** Returns a promise containing true on save success and false on save failure. */
  public saveAudioToResponse(responseId: string, audioFile: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = new HttpParams()
        .append('responseId', responseId);
      this.auth.get<any>(`/api/responses/generate-audio-url`, params)
        .subscribe((data) => {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'audio/wav'
            })
          };
          this.http.put(data.signedUrl, audioFile, httpOptions)
            .subscribe((result) => {
              this.auth.post(`/api/responses/save-success`, {responseId: responseId})
                .subscribe((response) => {
                  resolve(true);
                });
              }, (error) => {
                this.auth.post(`/api/responses/save-failed`, {responseId: responseId})
                .subscribe((response) => {
                  resolve(false);
                });
              });
        });
    });
  }
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
}
