import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signupRequestPayload } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signup(signuprequestpayload: signupRequestPayload) : Observable<any> {
    return this.httpClient.post("localhost:8080/api/auth/register", signuprequestpayload, {responseType: 'text'});
  }
}
