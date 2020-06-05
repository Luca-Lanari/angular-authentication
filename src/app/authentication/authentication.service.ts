import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiURLRegistration = '/api/registration';

  constructor(private http: HttpClient) {
  }

  registration(values: any) {
    return this.http.post(this.apiURLRegistration, values);
  }

}
