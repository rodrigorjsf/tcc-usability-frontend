import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthSocialLink, PEX_AUTH_OPTIONS} from '../../auth.options';
import {getDeepFromObject} from '../../helpers';
import {AuthService} from '../../services/auth.service';
import {NbToastrService} from '@nebular/theme';
import {Authentication} from '../../../data/authentication';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';
  clicked: boolean = false;
  error: boolean = false;
  messages: string;
  status: string;
  user: any = {};
  userAuthentication: any = {};
  submitted = false;
  socialLinks: AuthSocialLink[] = [];
  rememberMe = false;
  errors: string[];

  constructor(protected service: AuthService,
              private toastrService: NbToastrService,
              @Inject(PEX_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private authentication: Authentication) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(login: String = this.user.email, password: String = this.user.password): void {
    this.clicked = true;
    if (login == null || password == null) {
      alert('Incorrect user.');
    }

    this.authentication.postLoginAuthentication(login, password)
      .subscribe(async res => {
        if (res != null) {
          this.userAuthentication = res;
          this.showToast('top-left', 'User successfully logged in!', `User: ${this.userAuthentication.name}`, 'success', 'checkmark-outline');
          localStorage.setItem('accessToken', this.userAuthentication.accessToken);
          localStorage.setItem('name', this.userAuthentication.name);
          localStorage.setItem('username', this.userAuthentication.username);
          localStorage.setItem('roles', this.userAuthentication.roles);
          localStorage.setItem('user', JSON.stringify(this.userAuthentication));
          await this.router.navigate(['/pages'], {skipLocationChange: true});
        } else {
          this.showToast('top-left', 'User and / or password not found!', 'Error', 'danger', 'close-circle-outline');
        }
      });
  }

  logout() {
    localStorage.setItem('accessToken', null);
    localStorage.setItem('username', null);
    this.router.navigate(['/']);
  }

  showToast(position, message, title, status, icon, preventDuplicates = true) {
    this.toastrService.show(
      message,
      title,
      {position, preventDuplicates, status, icon});
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
