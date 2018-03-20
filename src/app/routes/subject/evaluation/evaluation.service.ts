import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth.service';

@Injectable()
export class EvaluationService {

  constructor(
    private auth: AuthService
  ) { }

  public getCurrentVideo(programId: string): Observable<any> {
    return this.auth.get(`/api/programs/${programId}/get-video`);
  }

  public beginResponseProcess(programId: string, videoId: string): Observable<any> {
    let reqBody = {
      programId: programId,
      videoId: videoId
    };
    return this.auth.post(`/api/responses/initialize`, reqBody);
  }

  public generateAudioUrl(responseId: string): Observable<any> {
    let params = new HttpParams()
      .append('responseId', responseId);
    return this.auth.get(`/api/responses/generate-audio-url`, params);
  }
}
