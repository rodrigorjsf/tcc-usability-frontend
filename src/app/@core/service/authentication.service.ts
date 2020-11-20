import {Injectable} from '@angular/core';
import {Authentication, LoginAuthentication} from '../data/authentication';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RegisterDTO} from "../../models/dto/RegisterDTO";

@Injectable()
export class AuthenticationService extends Authentication {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  postLoginAuthentication(login, password): Observable<LoginAuthentication> {
    return this.http.post<LoginAuthentication>(`${this.baseUrl}/auth/login`, {login: login, password: password});
  }

  postRegister(registerDTO: RegisterDTO): Observable<LoginAuthentication> {
    return this.http.post<LoginAuthentication>(`${this.baseUrl}/auth/sign-up`, registerDTO);
  }
}
