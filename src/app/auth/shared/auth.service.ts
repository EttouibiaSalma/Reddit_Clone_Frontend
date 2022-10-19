import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signupRequestPayload } from '../signup/signup-request.payload';
import { map, Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signuprequestpayload: signupRequestPayload) : Observable<any> {
    return this.httpClient.post("localhost:8080/api/auth/register", signuprequestpayload, {responseType: 'text'});
  }
  login(loginRequestPayload: LoginRequestPayload) :Observable<boolean>{
    return this.httpClient.post<LoginResponsePayload>("localhost:8080/api/auth/login", loginRequestPayload)
      .pipe(map(data => {
      this.localStorage.store("authenticationToken", data.authenticationToken);
      this.localStorage.store("refreshToken", data.refreshToken);
      this.localStorage.store("expireAt", data.expireAt);
      this.localStorage.store("username", data.username);
      return true;
    }));
  }
}
