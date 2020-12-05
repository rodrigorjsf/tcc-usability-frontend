/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {StoreModule} from '@ngrx/store';
import {AuthReducer} from './store/modules/auth/auth.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {InterceptorsModule} from './interceptors/interceptors.module';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/modules/auth/auth.effects';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {UserReducer} from './store/modules/user/user.reducer';
import {storageSyncMetaReducer} from 'ngrx-store-persist';
import {AssessmentService} from "./@core/auth/services/assessment.service";
import {NoSanitizePipe} from "./services/no-sanitizer-pipe.service";
import {ReviewService} from "./@core/auth/services/review.service";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {NbMomentDateModule} from "@nebular/moment";

@NgModule({
  declarations: [
    AppComponent,
    NoSanitizePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbDateFnsDateModule,
    NbMomentDateModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    StoreModule.forRoot({
      auth: AuthReducer,
      user: UserReducer,
    }, {
      metaReducers: [storageSyncMetaReducer],
    }),
    StoreDevtoolsModule.instrument({maxAge: 50}),
    InterceptorsModule,
    EffectsModule.forRoot([AuthEffects]),
    ToastrModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [
    AssessmentService,
    ReviewService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
