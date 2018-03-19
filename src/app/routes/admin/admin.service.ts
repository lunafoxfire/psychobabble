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

  public getAllRequests(page, resultCount, searchTerm?): Observable<any> {
    let params = new HttpParams().append("page", page).append("resultCount", resultCount).append("searchTerm", searchTerm);
    let result = this.auth.get('api/program-requests/pending', params);
    return result;
  }

  public getClients(page, resultCount): Observable<any> {
    let params = new HttpParams().append("page", page).append("resultCount", resultCount);
    let result = this.auth.get('api/users/get-clients', params);
    return result;
  }

  public getRequestDetails(requestId): Observable<any> {
    let result = this.auth.get('api/program-requests/'+requestId);
    return result;
  }

  public getClientDetails(clientId): Observable<any> {
    let result = this.auth.get('api/users/'+clientId);
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
