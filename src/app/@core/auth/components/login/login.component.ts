import {ChangeDetectionStrategy, Component} from '@angular/core';
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
      login: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [null],
    });
  }

  signIn () {
    this.store.dispatch(new AuthSignInRequest(this.value));
  }

  get value() {
    return this.form.value;
  }

  get controls() {
    return this.form.controls;
  }

  get login() {
    return this.controls.login;
  }

  get password() {
    return this.controls.password;
  }

  get rememberMe() {
    return this.controls.rememberMe;
  }
}
