import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssessmentComponent} from './assessment.component';
import {CreateAssessmentComponent} from './create-assessment/create-assessment.component';
import {ReviewAssessmentComponent} from './review-assesment/review-assessment.component';
import {ListAssessmentComponent} from './list-assessment/list-assessment.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    children: [
      {
        path: 'create',
        component: CreateAssessmentComponent,
      },
      {
        path: 'review',
        component: ReviewAssessmentComponent,
      },
      {
        path: 'list',
        component: ListAssessmentComponent,
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

