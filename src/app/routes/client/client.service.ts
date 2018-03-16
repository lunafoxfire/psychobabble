import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';

@Injectable()
export class ClientService {

  constructor(
    private auth: AuthService
  ) { }

  public getSkills(): Observable<any> {
    let result = this.auth.get('/api/program-requests/get-soft-skills');
    return result;
  }

  public makeRequest(request): Observable<any> {
    let result = this.auth.post('/api/program-requests/make-request', request);
    return result;
  }

  public getClientPrograms(): Observable<any> {
    let result = this.auth.get('/api/programs/'+this.auth.getTokenPayload().id);
    return result;
  }

  public getProgramDetails(programId): Observable<any> {
    let result = this.auth.get('/api/programs/client/'+programId);
    return result;
  }
}
