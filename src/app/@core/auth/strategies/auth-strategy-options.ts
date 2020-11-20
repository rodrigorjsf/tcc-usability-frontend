import { AuthTokenClass } from '../services/token/token';

export class AuthStrategyOptions {
  name: string;
  token?: {
    class?: AuthTokenClass;
    [key: string]: any;
  };
}
