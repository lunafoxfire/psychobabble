import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public registerSubject(credentials: RegisterCredentials): Observable<any> {
    let baseRequest = this.http.post('/api/auth/subject/register', credentials);
    return this.interceptToken(baseRequest);
  }

  public registerAdmin(email): Observable<any> {
    let baseRequest = this.http.post('/api/auth/admin/register', {email: email});
    return baseRequest;
  }

  public changeAdmin(credentials: RegisterCredentials): Observable<any> {
    let baseRequest = this.post('/api/auth/admin/change', credentials);
    return this.interceptToken(baseRequest);
  }

  public login(credentials: LoginCredentials): Observable<any> {
    let baseRequest = this.http.post('/api/auth/login', credentials);
    return this.interceptToken(baseRequest);
  }

  public verify(code: string): Observable<any> {
    if(this.isLoggedIn()) {
      let baseRequest = this.post('/api/auth/verify', {code:code});
      return this.interceptToken(baseRequest);
    }
  }
  public verifyAdmin(): Observable<any> {
    if(this.isLoggedIn()) {
      let baseRequest = this.post('/api/auth/verify-admin');
      return this.interceptToken(baseRequest);
    }
  }

  public reVerify(): Observable<any> {
    if(this.isLoggedIn()) {
      let data = this.get('/api/auth/re-verify');
      return data;
    }
  }

  public logout() {
    this._token = '';
    window.localStorage.removeItem('jwt');
    this.router.navigateByUrl('/');
  }

  public passReset(email): Observable<any> {
    let data = this.post('api/auth/reset', {email: email});
    return data;
  }

  public makeNewPass(newPass, userId, token): Observable<any> {
    let data = this.post('api/auth/change-password', {newPass: newPass, userId: userId, token: token});
    return data;
  }

  public resendPassReset(userId): Observable<any> {
    let data = this.post('api/auth/resend', {userId: userId});
    return data;
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

  public isRole(role: AuthRole): boolean {
    if(this.isLoggedIn()) {
      const user = this.getTokenPayload();
      if (user) {
        return user.role === role;
      }
    }
    return false;
  }

  public isAdmin(): boolean {
    return this.isRole(AuthRole.Admin);
  }

  public isClient(): boolean {
    return this.isRole(AuthRole.Client);
  }

  public isSubject(): boolean {
    return this.isRole(AuthRole.Subject);
  }

  public isVerified(): boolean {
    const tokenPayload = this.getTokenPayload();
    if(tokenPayload.validated) {
      return true;
    } else {
      return false;
    }
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

  public get<T>(route: string, params?: HttpParams): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      }),
      params: params
    };
    return this.http.get<T>(route, httpOptions);
  }

  public post<T>(route: string, body?): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    };
    return this.http.post<T>(route, body, httpOptions);
  }

  private saveToken(_token: string) {
    this._token = _token;
    localStorage.setItem('jwt', _token);
  }

  public saveResponseUrl(_resUrl: string) {
    localStorage.setItem('resUrl', _resUrl);
  }

  private getToken(): string {
    if (!this._token) {
      this._token = localStorage.getItem('jwt');
    }
    return this._token;
  }

  public getResponseUrl(): string {
    return localStorage.getItem('resUrl');
  }

  public clearResponseUrl() {
    localStorage.removeItem('resUrl');
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

export enum AuthRole {
  Admin = "ADMIN",
  Client = "CLIENT",
  Subject = "SUBJECT"
}

interface ResponseToken {
  token: string;
}
