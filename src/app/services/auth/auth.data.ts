import {AuthSignInRequestModel, AuthSignInResponseModel} from '../../models/auth.model';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export abstract class AuthData {
  abstract getUserByUsernameAndPassword(data: AuthSignInRequestModel):
    Observable<HttpResponse<AuthSignInResponseModel>>;
}
