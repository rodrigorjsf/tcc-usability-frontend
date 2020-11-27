import {NgModule} from '@angular/core';
import {ThemeModule} from "../../@theme/theme.module";
import {
  NbAccordionModule, NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbDatepickerModule,
  NbIconModule, NbInputModule,
  NbProgressBarModule, NbRadioModule, NbSelectModule,
  NbTooltipModule
} from "@nebular/theme";
import {ReviewRequestComponent} from "./review-request.component";
import {ReviewRequestRoutingModule} from "./review-request-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {AssessmentService} from "../../@core/auth/services/assessment.service";
import {QuestionService} from "../../@core/auth/services/question.service";
import {ReviewService} from "../../@core/auth/services/review.service";
import { ReviewComponent } from './review/review.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ReviewRequestComponent,
    ReviewComponent,
  ],
  imports: [
    ReviewRequestRoutingModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbAccordionModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbTooltipModule,
    NbProgressBarModule,
    FormsModule,
    NbSelectModule,
    NbCheckboxModule,
    NbActionsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbRadioModule,
    NbInputModule,
  ],
  providers: [
    AssessmentService,
    QuestionService,
    ReviewService,
  ],
})
export class ReviewRequestModule {
}
