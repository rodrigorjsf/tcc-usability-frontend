import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { AssessmentComponent } from './assessment.component';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbStepperModule,
  NbRadioModule,
} from '@nebular/theme';
import {CreateAssessmentComponent} from './create-assessment/create-assessment.component';
import {ListAssessmentComponent} from './list-assessment/list-assessment.component';
import {ReviewAssessmentComponent} from './review-assesment/review-assessment.component';
import {AssessmentRoutingModule} from './assessment-routing.module';

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
  ],
  declarations: [
    AssessmentComponent,
    CreateAssessmentComponent,
    ListAssessmentComponent,
    ReviewAssessmentComponent,
  ],
})
export class AssessmentModule { }
