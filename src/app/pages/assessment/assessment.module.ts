import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {AssessmentComponent} from './assessment.component';
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTooltipModule,
} from '@nebular/theme';
import {CreateAssessmentComponent} from './create-assessment/create-assessment.component';
import {ListAssessmentComponent} from './list-assessment/list-assessment.component';
import {ReviewAssessmentComponent} from './review-assesment/review-assessment.component';
import {AssessmentRoutingModule} from './assessment-routing.module';
import {AssessmentService} from '../../@core/auth/services/assessment.service';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {EditPlanComponent} from './list-assessment/edit-plan/edit-plan.component';
import {QuestionService} from '../../@core/auth/services/question.service';

@NgModule({
    imports: [
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        NbIconModule,
        NbCardModule,
        AssessmentRoutingModule,
        NbInputModule,
        NbButtonModule,
        NbStepperModule,
        NbRadioModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbAccordionModule,
        NbProgressBarModule,
        NbActionsModule,
        NbSelectModule,
        NbTooltipModule,
    ],
  declarations: [
    AssessmentComponent,
    CreateAssessmentComponent,
    ListAssessmentComponent,
    ReviewAssessmentComponent,
    EditPlanComponent,
  ],
  providers: [
    AssessmentService,
    QuestionService,
  ],
})
export class AssessmentModule {
}
