import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AdminService {

  constructor(
    private auth: AuthService
  ) { }

  public getAllPrograms(page, resultCount, searchTerm = ''): Observable<any> {
    let params = new HttpParams().append("page", page).append("resultCount", resultCount).append("searchTerm", searchTerm);
    let result = this.auth.get('api/programs/get-all', params);
    return result;
  }

  public getAllRequests(page, resultCount, searchTerm = ''): Observable<any> {
    let params = new HttpParams().append("page", page).append("resultCount", resultCount).append("searchTerm", searchTerm);
    let result = this.auth.get('api/program-requests/pending', params);
    return result;
  }

  public getProgramSubjects(programId): Observable<any> {
    let result = this.auth.get('api/users/'+programId+'/subjects');
    return result;
  }

  public getClients(page, resultCount, searchTerm = ''): Observable<any> {
    let params = new HttpParams().append("page", page).append("resultCount", resultCount).append("searchTerm", searchTerm);
    let result = this.auth.get('api/users/get-clients', params);
    return result;
  }

  public getRequestDetails(requestId): Observable<any> {
    let result = this.auth.get('api/program-requests/'+requestId);
    return result;
  }

  public getClientDetails(parameters: GetClientDetailsParameters): Observable<any> {
    let params = new HttpParams().append("programPage", parameters.programPage).append("programSearchTerm", parameters.programSearchTerm).append("requestPage", parameters.requestPage).append("requestSearchTerm", parameters.requestSearchTerm).append("programResultCount", parameters.programResultCount).append("requestResultCount", parameters.requestResultCount);
    let result = this.auth.get('api/users/'+parameters.clientId, params);
    return result;
  }

  public getProgramDetails(programId, clientId): Observable<any> {
    let result = this.auth.get('/api/programs/'+clientId+'/'+programId);
    return result;
  }

  public makeProgram(program, requestId): Observable<any> {
    let result = this.auth.post('api/programs/new', {program: program, requestId: requestId});
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
