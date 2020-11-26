import {NgModule} from '@angular/core';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HomeModule} from './home/home.module';
import { DownloadPlanDialogComponent } from './modal/download-plan-dialog/download-plan-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    MiscellaneousModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ReactiveFormsModule,
    NbButtonModule,
  ],
  declarations: [
    PagesComponent,
    DownloadPlanDialogComponent,
  ],
})
export class PagesModule {
}
