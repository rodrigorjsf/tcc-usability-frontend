export interface AuthState {
  token: string;
  signed: boolean;
}

export interface AuthSignInRequestModel {
  login: string;
  password: string;
}

export interface AuthSignInResponseModel {
  username: string;
  userUid: string;
  accessToken: string;
  roles: string[];
}
