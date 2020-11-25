import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HomeModule} from './home/home.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
