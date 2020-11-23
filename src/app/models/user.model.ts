export interface UserState {
  uid: string;
  username: string;
  name: string;
  reviewer: boolean;
  roles: Authority[];
}

export interface Authority {
  authority: string;
}

export interface RegisterUserRequestModel {
  name: string;
  userName: string;
  password: string;
  email: string;
  reviewer: boolean;
  admin: boolean;
}
