import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ClientService {

  constructor(
    private auth: AuthService
  ) { }

  public getSkills(): Observable<any> {
    const result = this.auth.get('/api/soft-skills/get-all');
    return result;
  }

  public makeRequest(request): Observable<any> {
    const result = this.auth.post('/api/program-requests/make-request', request);
    return result;
  }

  public getClientPrograms(page, resultCount, searchTerm = ''): Observable<any> {
    const params = new HttpParams()
      .append("page", page)
      .append("resultCount", resultCount)
      .append("searchTerm", searchTerm);
    const result = this.auth.get('/api/programs/' + this.auth.getTokenPayload().id, params);
    return result;
  }

  public getClientRequests(page, resultCount, searchTerm = ''): Observable<any> {
    const params = new HttpParams()
      .append("page", page)
      .append("resultCount", resultCount)
      .append("searchTerm", searchTerm);
    const result = this.auth.get('/api/program-requests/client/pending/', params);
    return result;
  }

  public getRequestDetails(requestId): Observable<any> {
    const result = this.auth.get('/api/program-requests/client/' + requestId);
    return result;
  }

  public getProgramDetails(programId): Observable<any> {
    const result = this.auth.get('/api/programs/client/' + programId);
    return result;
  }

  public getTopSubjects(programId): Observable<any> {
    const result = this.auth.get('/api/users/' + programId + '/top-subjects');
    return result;
  }

  public closeProgram(programId): Observable<any> {
    const result = this.auth.post(`/api/programs/close/${programId}`);
    return result;
  }
}
