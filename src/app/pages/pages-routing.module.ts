import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'assessment',
      loadChildren: () => import('./assessment/assessment.module')
        .then(m => m.AssessmentModule),
    },
    {
      path: 'review-request',
      loadChildren: () => import('./review-request/review-request.module')
        .then(m => m.ReviewRequestModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'references',
      loadChildren: () => import('./references/references-routing.module')
        .then(m => m.ReferencesRoutingModule),
    },
    {
      path: 'suggested-scales',
      loadChildren: () => import('./suggested-scales/suggested-scales.module')
        .then(m => m.SuggestedScalesModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
