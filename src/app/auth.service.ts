import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public registerClient(credentials: RegisterCredentials): Observable<any> {
    let baseRequest = this.http.post('/api/auth/client/register', credentials);
    return this.interceptToken(baseRequest);
  }

  public login(credentials: LoginCredentials): Observable<any> {
    let baseRequest = this.http.post('/api/auth/login', credentials);
    return this.interceptToken(baseRequest);
  }

  public get<T>(route: string): Observable<T> {
    return this.http.get<T>(route, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  public logout() {
    this._token = '';
    window.localStorage.removeItem('jwt');
    this.router.navigateByUrl('/');
  }

  public isLoggedIn(): boolean {
    const user = this.getTokenPayload();
    if (user) {
      return user.exp > Date.now() / 1000
    }
    else {
      return false;
    }
  }

  public isAdmin(): boolean {
    if (this.isLoggedIn()) {
      const user = this.getTokenPayload();
      if (user) {
        return user.role === 'ADMIN';
      }
    }
    return false;
  }

  public isClient(): boolean {
    if (this.isLoggedIn()) {
      const user = this.getTokenPayload();
      if (user) {
        return user.role === 'CLIENT';
      }
    }
    return false;
  }

  public isSubject(): boolean {
    if (this.isLoggedIn()) {
      const user = this.getTokenPayload();
      if (user) {
        return user.role === 'SUBJECT';
      }
    }
    return false;
  }

  public getTokenPayload(): TokenPayload {
    const token = this.getToken();
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
    else {
      return null;
    }
  }

  private saveToken(_token: string) {
    this._token = _token;
    localStorage.setItem('jwt', _token);
  }

  private getToken(): string {
    if (!this._token) {
      this._token = localStorage.getItem('jwt');
    }
    return this._token;
  }

  private interceptToken(baseRequest: Observable<any>): Observable<any> {
    const request = baseRequest.pipe(
      map((data: ResponseToken) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  loginName: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;
  validated: boolean;
  exp: number;
  iat: number;
}

interface ResponseToken {
  token: string;
}
