import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {AssessmentComponent} from './assessment.component';
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
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
import {ReviewedPlanComponent} from './reviewed-plan/reviewed-plan.component';
import {AssessmentRoutingModule} from './assessment-routing.module';
import {AssessmentService} from '../../@core/auth/services/assessment.service';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {EditPlanComponent} from './list-assessment/edit-plan/edit-plan.component';
import {QuestionService} from '../../@core/auth/services/question.service';
import {EditApplicationSectionComponent} from './list-assessment/edit-plan/edit-application-section/edit-application-section.component';
import {EditGoalSectionComponent} from './list-assessment/edit-plan/edit-goal-section/edit-goal-section.component';
import {EditVariableSectionComponent} from './list-assessment/edit-plan/edit-variable-section/edit-variable-section.component';
import {EditParticipantSectionComponent} from './list-assessment/edit-plan/edit-participant-section/edit-participant-section.component';
import {EditTaskSectionComponent} from './list-assessment/edit-plan/edit-task-section/edit-task-section.component';
import {EditProcedureSectionComponent} from './list-assessment/edit-plan/edit-procedure-section/edit-procedure-section.component';
import {EditDataSectionComponent} from './list-assessment/edit-plan/edit-data-section/edit-data-section.component';
import {EditThreatSectionComponent} from './list-assessment/edit-plan/edit-threat-section/edit-threat-section.component';
import {NbDateFnsDateModule} from "@nebular/date-fns";
import { NewCollaboratorComponent } from './new-collaborator/new-collaborator.component';
import { AddCollaboratorComponent } from './list-assessment/edit-plan/add-collaborator/add-collaborator.component';
import { RequestReviewComponent } from './list-assessment/edit-plan/request-review/request-review.component';
import {ReviewService} from "../../@core/auth/services/review.service";

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
    NbCheckboxModule,
    NbDateFnsDateModule,
    NbDatepickerModule,
  ],
  declarations: [
    AssessmentComponent,
    CreateAssessmentComponent,
    ListAssessmentComponent,
    ReviewedPlanComponent,
    EditPlanComponent,
    EditApplicationSectionComponent,
    EditGoalSectionComponent,
    EditVariableSectionComponent,
    EditParticipantSectionComponent,
    EditTaskSectionComponent,
    EditProcedureSectionComponent,
    EditDataSectionComponent,
    EditThreatSectionComponent,
    NewCollaboratorComponent,
    AddCollaboratorComponent,
    RequestReviewComponent,
  ],
  providers: [
    AssessmentService,
    QuestionService,
    ReviewService,
  ],
})
export class AssessmentModule {
}
