import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestsService {

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }


  public getSkills(): Observable<any> {
    let result = this.auth.get('/api/program-requests/get-soft-skills');
    return result;
  }
}
