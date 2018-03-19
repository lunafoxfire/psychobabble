import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../auth.service';

@Injectable()
export class ProfileService {

  constructor(
    public auth: AuthService
  ) { }

  public getProfile(): Observable<any> {
    let result = this.auth.get('/api/user/profile');
    return result;
  }
}
