import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthSocialLink, PEX_AUTH_OPTIONS} from '../../auth.options';
import {getDeepFromObject} from '../../helpers';

import {AuthService} from '../../services/auth.service';
import {RegisterDTO} from '../../../../models/dto/RegisterDTO';
import {Authentication} from "../../../data/authentication";
import {NbToastrService} from "@nebular/theme";


@Component({
  selector: 'pex-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';
  registerDTO: RegisterDTO;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  userRegistration: any = {};
  user: any = {};
  socialLinks: AuthSocialLink[] = [];
  clicked: boolean;

  constructor(protected service: AuthService,
              private toastrService: NbToastrService,
              @Inject(PEX_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private authentication: Authentication) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  register(): void {
    this.registerDTO = new RegisterDTO();
    this.registerDTO.email = this.user.email;
    this.registerDTO.name = this.user.fullName;
    this.registerDTO.userName = this.user.username;
    this.registerDTO.password = this.user.password;
    this.registerDTO.isReviewer = this.user.isReviewer;
    this.clicked = true;

    this.authentication.postRegister(this.registerDTO)
      .subscribe(async res => {
        console.log(res);
        if (res != null) {
          this.userRegistration = res;
          this.showToast('top-left', 'User successfully registered!', `User: ${this.userRegistration.name}`, 'success', 'checkmark-outline');
          await this.router.navigate(['/auth/login'], {skipLocationChange: true});
        } else {
          this.showToast('top-left', 'Error when registering user.', 'Error', 'danger', 'close-circle-outline');
        }
      });
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
