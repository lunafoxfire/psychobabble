import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';

@Injectable()
export class SubjectService {

  constructor(
    private auth: AuthService
  ) { }

  public getCurrentVideo(programId): Observable<any> {
    let result = this.auth.get('/api/programs/'+programId+'/get-video');
    return result;
  }
}
