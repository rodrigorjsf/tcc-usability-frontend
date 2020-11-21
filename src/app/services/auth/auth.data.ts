import {AuthSignInRequestModel, AuthSignInResponseModel} from '../../models/auth.model';
import {Observable} from 'rxjs';

export abstract class AuthData {
  abstract getUserByUsernameAndPassword(data: AuthSignInRequestModel): Observable<AuthSignInResponseModel>;
}
