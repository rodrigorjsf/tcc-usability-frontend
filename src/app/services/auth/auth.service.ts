import {Injectable} from '@angular/core';
import {AuthData} from './auth.data';
import {AuthSignInRequestModel, AuthSignInResponseModel} from '../../models/auth.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthData {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getUserByUsernameAndPassword(data: AuthSignInRequestModel): Observable<AuthSignInResponseModel> {
    return this.http.post<AuthSignInResponseModel>(`${this.url}/auth/login`, data);
  }
}
