import {AuthSignInRequestModel, AuthSignInResponseModel} from '../../models/auth.model';
import {Observable} from 'rxjs';
import {RegisterUserRequestModel} from '../../models/user.model';

export abstract class UserData {
  abstract registerUser(data: RegisterUserRequestModel): Observable<void>;
}
