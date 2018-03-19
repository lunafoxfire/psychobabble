import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth.service';

@Injectable()
export class EvaluationService {

  constructor(
    private auth: AuthService
  ) { }

  public getCurrentVideo(programId: string) {
    return this.auth.get(`/api/programs/${programId}/get-video`);
  }
}
