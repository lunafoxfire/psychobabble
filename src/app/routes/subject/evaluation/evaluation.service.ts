import { Injectable } from '@angular/core';
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
    return this.auth.post(`/api/responses/start`, reqBody);
  }
}
