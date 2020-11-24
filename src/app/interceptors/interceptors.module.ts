import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthInterceptor} from './auth-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorsModule { }
