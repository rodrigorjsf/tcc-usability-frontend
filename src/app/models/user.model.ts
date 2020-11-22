export interface UserState {
  uid: string;
  username: string;
  name: string;
  isReviewer: boolean;
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
  isReviewer: boolean;
  admin: boolean;
}
