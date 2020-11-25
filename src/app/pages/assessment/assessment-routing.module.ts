import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssessmentComponent} from './assessment.component';
import {CreateAssessmentComponent} from './create-assessment/create-assessment.component';
import {ReviewAssessmentComponent} from './review-assesment/review-assessment.component';
import {ListAssessmentComponent} from './list-assessment/list-assessment.component';
import {EditPlanComponent} from './list-assessment/edit-plan/edit-plan.component';
import {AdminGuard} from '../../guards/admin.guard';
import {EditApplicationSectionComponent} from './list-assessment/edit-plan/edit-application-section/edit-application-section.component';
import {EditGoalSectionComponent} from "./list-assessment/edit-plan/edit-goal-section/edit-goal-section.component";
import {EditVariableSectionComponent} from "./list-assessment/edit-plan/edit-variable-section/edit-variable-section.component";
import {EditParticipantSectionComponent} from "./list-assessment/edit-plan/edit-participant-section/edit-participant-section.component";
import {EditTaskSectionComponent} from "./list-assessment/edit-plan/edit-task-section/edit-task-section.component";
import {EditProcedureSectionComponent} from "./list-assessment/edit-plan/edit-procedure-section/edit-procedure-section.component";
import {EditDataSectionComponent} from "./list-assessment/edit-plan/edit-data-section/edit-data-section.component";
import {EditThreatSectionComponent} from "./list-assessment/edit-plan/edit-threat-section/edit-threat-section.component";

const routes: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    children: [
      {
        path: 'create',
        component: CreateAssessmentComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans',
        component: ListAssessmentComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit',
        component: EditPlanComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/application',
        component: EditApplicationSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/goal',
        component: EditGoalSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/variable',
        component: EditVariableSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/participant',
        component: EditParticipantSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/tools',
        component: EditTaskSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/procedure',
        component: EditProcedureSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/data',
        component: EditDataSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-plans/edit/threats',
        component: EditThreatSectionComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'list',
        component: ReviewAssessmentComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AssessmentRoutingModule {
}

