import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AdminService {

  constructor(
    private auth: AuthService
  ) { }

  public getAllPrograms(page, resultCount, searchTerm = ''): Observable<any> {
    const params = new HttpParams()
      .append("page", page)
      .append("resultCount", resultCount)
      .append("searchTerm", searchTerm);
    const result = this.auth.get('api/programs/get-all', params);
    return result;
  }

  public getAllRequests(page, resultCount, searchTerm = ''): Observable<any> {
    const params = new HttpParams()
      .append("page", page)
      .append("resultCount", resultCount)
      .append("searchTerm", searchTerm);
    const result = this.auth.get('api/program-requests/pending', params);
    return result;
  }

  public getProgramSubjects(programId): Observable<any> {
    const result = this.auth.get('api/users/' + programId + '/subjects');
    return result;
  }

  public getClients(page, resultCount, searchTerm = ''): Observable<any> {
    const params = new HttpParams()
      .append("page", page)
      .append("resultCount", resultCount)
      .append("searchTerm", searchTerm);
    const result = this.auth.get('api/users/get-clients', params);
    return result;
  }

  public getRequestDetails(requestId): Observable<any> {
    const result = this.auth.get('api/program-requests/' + requestId);
    return result;
  }

  public getClientDetails(parameters: GetClientDetailsParameters): Observable<any> {
    const params = new HttpParams()
      .append("programPage", parameters.programPage)
      .append("programSearchTerm", parameters.programSearchTerm)
      .append("requestPage", parameters.requestPage)
      .append("requestSearchTerm", parameters.requestSearchTerm)
      .append("programResultCount", parameters.programResultCount)
      .append("requestResultCount", parameters.requestResultCount);
    const result = this.auth.get('api/users/' + parameters.clientId, params);
    return result;
  }

  public getProgramDetails(programId, clientId): Observable<any> {
    const result = this.auth.get('/api/programs/' + clientId + '/' + programId);
    return result;
  }

  public getSubjectResponses(programId, subjectId): Observable<any> {
    const params = new HttpParams()
      .append("programId", programId)
      .append("subjectId", subjectId);
    const result = this.auth.get('/api/responses/pending', params);
    return result;
  }

  public getTopSubjects(programId): Observable<any> {
    const result = this.auth.get('/api/users/' + programId + '/top-subjects');
    return result;
  }

  public makeProgram(program, requestId): Observable<any> {
    const result = this.auth.post('api/programs/new', {program: program, requestId: requestId});
    return result;
  }

  public scoreResponse(score, responseId): Observable<any> {
    const result = this.auth.post('/api/responses/score/' + responseId, {score: score});
    return result;
  }
}

export interface GetClientDetailsParameters {
  clientId: string;
  programPage: any;
  programSearchTerm?: string;
  requestPage: any;
  requestSearchTerm?: string;
  programResultCount: any;
  requestResultCount: any;
}
