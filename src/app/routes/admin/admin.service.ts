import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';

@Injectable()
export class AdminService {

  constructor(
    private auth: AuthService
  ) { }

  public getAllPrograms(page, resultCount): Observable<any> {
    let result = this.auth.get('api/programs/get-all', {page: page, resultCount: resultCount});
    return result;
  }

  public getAllRequests(page, resultCount): Observable<any> {
    let result = this.auth.get('api/program-requests/pending', {page: page, resultCount: resultCount});
    return result;
  }

  public getClients(page, resultCount): Observable<any> {
    let result = this.auth.get('api/users/get-clients', {page: page, resultCount: resultCount});
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

  public getClientRequestDetails(requestId): Observable<any> {
    let result = this.auth.get('/api/program-requests/admin/'+requestId);
    return result;
  }

  public makeProgram(program, requestId): Observable<any> {
    let result = this.auth.post('api/programs/new', {program: program, requestId: requestId});
    return result;
  }

}
