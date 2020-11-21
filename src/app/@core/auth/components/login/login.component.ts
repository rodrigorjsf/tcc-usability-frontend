import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthSocialLink, PEX_AUTH_OPTIONS} from '../../auth.options';
import {getDeepFromObject} from '../../helpers';
import {AuthService} from '../../services/auth.service';
import {NbToastrService} from '@nebular/theme';
import {Authentication} from '../../../data/authentication';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {AuthSignInRequest} from '../../../../store/modules/auth/auth.actions';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [null],
    });
  }

  login () {
    this.store.dispatch(new AuthSignInRequest(this.value));
  }

  get value() {
    return this.form.value;
  }

  get controls() {
    return this.form.controls;
  }

  get username() {
    return this.controls.username;
  }

  get password() {
    return this.controls.password;
  }

  get rememberMe() {
    return this.controls.rememberMe;
  }
}
