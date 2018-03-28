import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ProfileService {

  constructor(
    public auth: AuthService
  ) { }

  public getProfile(): Observable<any> {
    const result = this.auth.get('/api/users/profile');
    return result;
  }
}
