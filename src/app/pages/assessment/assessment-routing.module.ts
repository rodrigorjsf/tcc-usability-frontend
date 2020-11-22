import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssessmentComponent} from './assessment.component';
import {CreateAssessmentComponent} from './create-assessment/create-assessment.component';
import {ReviewAssessmentComponent} from './review-assesment/review-assessment.component';
import {ListAssessmentComponent} from './list-assessment/list-assessment.component';
import {AdminGuard} from '../../@core/auth/services/guard/admin.guard';
import {EditPlanComponent} from './list-assessment/edit-plan/edit-plan.component';

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
        path: 'my-assessments',
        component: ListAssessmentComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'my-assessments/edit',
        component: EditPlanComponent,
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

