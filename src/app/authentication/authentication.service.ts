import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {UserDetail} from '../shared/interfaces/UserDetail';
import {TokenPayload} from '../shared/interfaces/TokenPayload';
import {TokenResponse} from '../shared/interfaces/TokenResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api = '/api/';
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public parseJwt(token) {
    let payload;
    payload = token.split('.')[1];
    payload = payload.replace('-', '+').replace('_', '/');
    payload = window.atob(payload);
    return payload;
  }
  public getUserDetail(): UserDetail {
    const token = this.getToken();
    let payload;

    if (token) {
      payload = this.parseJwt(token);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetail();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;
    let request;
    if (method === 'post') {
      base = this.http.post(`${this.api}${type}`, user);
    } else {
      base = this.http.get(`${this.api}${type}`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
    }

    request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  // TODO Fix passaggio dati dal FE al BE
  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

}
