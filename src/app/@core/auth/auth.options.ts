import {InjectionToken} from '@angular/core';
import {HttpRequest} from '@angular/common/http';
import {AuthStrategy} from './strategies/auth-strategy';
import {AuthStrategyOptions} from './strategies/auth-strategy-options';
import {AuthToken, AuthTokenClass} from './services/token/token';

export type AuthStrategyClass = new (...params: any[]) => AuthStrategy;

export type AuthStrategies = [AuthStrategyClass, AuthStrategyOptions][];

export interface AuthOptions {
  forms?: any;
  strategies?: AuthStrategies;
}

export interface AuthSocialLink {
  link?: string;
  url?: string;
  target?: string;
  title?: string;
  icon?: string;
}

const socialLinks: AuthSocialLink[] = [];

export const defaultAuthOptions: any = {
  strategies: [],
  forms: {
    login: {
      redirectDelay: 500,
      strategy: 'email',
      rememberMe: true,
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    register: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 500,
      strategy: 'email',
    },
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      email: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },
};

export const PEX_AUTH_OPTIONS = new InjectionToken<AuthOptions>('Pex Auth Options');
export const PEX_AUTH_USER_OPTIONS = new InjectionToken<AuthOptions>('Pex User Auth Options');
export const PEX_AUTH_STRATEGIES = new InjectionToken<AuthStrategies>('Pex Auth Strategies');
export const PEX_AUTH_TOKENS = new InjectionToken<AuthTokenClass<AuthToken>[]>('Pex Auth Tokens');
export const PEX_AUTH_INTERCEPTOR_HEADER = new InjectionToken<string>('Pex Simple Interceptor Header');
export const PEX_AUTH_TOKEN_INTERCEPTOR_FILTER = new InjectionToken<(req: HttpRequest<any>) => boolean>('Pex Interceptor Filter');

