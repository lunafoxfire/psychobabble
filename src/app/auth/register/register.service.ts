import { Injectable } from '@angular/core';
import { AuthService, RegisterCredentials } from '../auth.service';


@Injectable()
export class RegisterService {
  private _token: string;

  constructor(
    private auth: AuthService
  ) { }

  public register(credentials: RegisterCredentials): Promise<RegisterResult> {
    return new Promise((resolve, reject) => {
      if (this.auth.getResponseUrl()) {
        this.auth.registerSubject(credentials).subscribe(() => {
          resolve({success: true});
        }, (errResponse) => {
          resolve({success: false, failureReason: errResponse.error.failureReason});
        });
      } else {
        this.auth.registerClient(credentials).subscribe(() => {
          resolve({success: true});
        }, (errResponse) => {
          resolve({success: false, failureReason: errResponse.error.failureReason});
        });
      }
    });
  }
}

export interface RegisterResult {
  success: boolean;
  failureReason?: string;
}
