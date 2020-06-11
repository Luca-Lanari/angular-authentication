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
    console.log('saveToken(): ', token);
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    // console.log('getToken(): ', this.token);
    if (!this.token) {
      return this.token = localStorage.getItem('mean-token');
    }
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetail(): UserDetail {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    console.log('isLoggedIn');
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
        console.log('TokenResponse: ', data);
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    console.log('request: ', request);
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

}
