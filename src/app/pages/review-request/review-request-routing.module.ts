import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../../guards/admin.guard';
import {ReviewRequestComponent} from "./review-request.component";
import {ReviewComponent} from "./review/review.component";

const routes: Routes = [
  {
    path: '',
    component: ReviewRequestComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [AdminGuard],
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
export class ReviewRequestRoutingModule {
}

