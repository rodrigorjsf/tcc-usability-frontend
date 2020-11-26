import {NgModule} from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule
} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {HomeModule} from './home/home.module';
import { DownloadPlanDialogComponent } from './modal/download-plan-dialog/download-plan-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ReferencesComponent } from './references/references.component';
import { SuggestedScalesComponent } from './suggested-scales/suggested-scales.component';

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
    NbAccordionModule,
  ],
  declarations: [
    PagesComponent,
    DownloadPlanDialogComponent,
  ],
})
export class PagesModule {
}
