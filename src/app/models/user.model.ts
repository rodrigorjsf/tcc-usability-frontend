export interface UserState {
  username: string;
  email: string;
  name: string;
  isReviewer: boolean;
}


export interface RegisterUserRequestModel {
  name: string;
  userName: string;
  password: string;
  email: string;
  isReviewer: boolean;
  admin: boolean;
}
