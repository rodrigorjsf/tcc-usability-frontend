import {NgModule} from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReferencesComponent } from './references/references.component';
import { SuggestedScalesComponent } from './suggested-scales/suggested-scales.component';
import { DialogDataReviewComponent } from './modal/dialog-data-review/dialog-data-review.component';
import { FinishReviewDialogComponent } from './modal/finish-review-dialog/finish-review-dialog.component';

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
    NbDatepickerModule,
    FormsModule,
  ],
  declarations: [
    PagesComponent,
    DownloadPlanDialogComponent,
    DialogDataReviewComponent,
    FinishReviewDialogComponent,
  ],
})
export class PagesModule {
}
