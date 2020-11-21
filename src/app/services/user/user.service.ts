import {Injectable} from '@angular/core';
import {UserData} from './user.data';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RegisterUserRequestModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService implements UserData {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  registerUser(data: RegisterUserRequestModel): Observable<void> {
    return this.http.post<void>(`${this.url}/auth/sign-up`, data);
  }
}
