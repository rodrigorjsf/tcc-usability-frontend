import {AuthState} from '../models/auth.model';
import {UserState} from '../models/user.model';

export interface AppState {
  auth: AuthState;
  user: UserState;
}
