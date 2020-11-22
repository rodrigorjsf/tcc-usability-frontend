import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpRequest} from '@angular/common/http';


import {AuthService} from './services/auth.service';
import {AuthRoutingModule} from './auth.routes';
import {AuthSimpleToken, AuthTokenClass} from './services/token/token';
import {TokenLocalStorage, TokenStorage} from './services/token/token-storage';
import {TokenService} from './services/token/token.service';
import {AuthTokenParceler, PEX_AUTH_FALLBACK_TOKEN} from './services/token/token-parceler';
import {AuthStrategy} from './strategies/auth-strategy';
import {AuthStrategyOptions} from './strategies/auth-strategy-options';
import {PasswordAuthStrategy} from './strategies/password/password-strategy';
import {AdminGuard} from '../../guards/admin.guard';

import {
  AuthOptions,
  AuthStrategyClass,
  defaultAuthOptions,
  PEX_AUTH_INTERCEPTOR_HEADER,
  PEX_AUTH_OPTIONS,
  PEX_AUTH_STRATEGIES,
  PEX_AUTH_TOKEN_INTERCEPTOR_FILTER,
  PEX_AUTH_TOKENS,
  PEX_AUTH_USER_OPTIONS,
} from './auth.options';

import {AuthComponent} from './components/auth.component';

import {AuthBlockComponent} from './components/auth-block/auth-block.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {LogoutComponent} from './components/logout/logout.component';
import {RequestPasswordComponent} from './components/request-password/request-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

import {deepExtend} from './helpers';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbThemeModule,
} from '@nebular/theme';

export function strategiesFactory(options: AuthOptions, injector: Injector): AuthStrategy[] {
  const strategies = [];
  options.strategies
    .forEach(([strategyClass, strategyOptions]: [AuthStrategyClass, AuthStrategyOptions]) => {
      const strategy: AuthStrategy = injector.get(strategyClass);
      strategy.setOptions(strategyOptions);

      strategies.push(strategy);
    });
  return strategies;
}

export function tokensFactory(strategies: AuthStrategy[]): AuthTokenClass[] {
  const tokens = [];
  strategies
    .forEach((strategy: AuthStrategy) => {
      tokens.push(strategy.getOption('token.class'));
    });
  return tokens;
}

export function optionsFactory(options) {
  return deepExtend(defaultAuthOptions, options);
}

export function noOpInterceptorFilter(req: HttpRequest<any>): boolean {
  return true;
}

@NgModule({
    imports: [
        AuthRoutingModule,
        NbThemeModule,
        NbAlertModule,
        NbIconModule,
        NbCheckboxModule,
        FormsModule,
        CommonModule,
        NbCardModule,
        NbCheckboxModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        RouterModule,
        FormsModule,
        NbIconModule,
        NbLayoutModule,
        NbSelectModule,
        ReactiveFormsModule,
    ],
  declarations: [
    AuthComponent,
    AuthBlockComponent,
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
  ],
})

export class AuthModule {
  static forRoot(authOptions?: AuthOptions): ModuleWithProviders<any> {
    return <ModuleWithProviders<any>> {
      ngModule: AuthModule,
      providers: [
        { provide: PEX_AUTH_USER_OPTIONS, useValue: authOptions },
        { provide: PEX_AUTH_OPTIONS, useFactory: optionsFactory, deps: [PEX_AUTH_USER_OPTIONS] },
        { provide: PEX_AUTH_STRATEGIES, useFactory: strategiesFactory, deps: [PEX_AUTH_OPTIONS, Injector] },
        { provide: PEX_AUTH_TOKENS, useFactory: tokensFactory, deps: [PEX_AUTH_STRATEGIES] },
        { provide: PEX_AUTH_FALLBACK_TOKEN, useValue: AuthSimpleToken },
        { provide: PEX_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        { provide: PEX_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: noOpInterceptorFilter },
        { provide: TokenStorage, useClass: TokenLocalStorage },
        AuthTokenParceler,
        AuthService,
        TokenService,
        AdminGuard,
        PasswordAuthStrategy,
      ],
    };
  }
}
