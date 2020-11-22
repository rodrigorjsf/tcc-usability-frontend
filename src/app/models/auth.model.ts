import {Authority} from './user.model';

export interface AuthState {
  token: string;
  signed: boolean;
}

export interface AuthSignInRequestModel {
  login: string;
  password: string;
}

export interface AuthSignInResponseModel {
  name: string;
  username: string;
  userUid: string;
  accessToken: string;
  date: number;
  roles: Authority[];
}
