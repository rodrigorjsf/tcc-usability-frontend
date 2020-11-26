import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../../guards/admin.guard';
import {SuggestedScalesComponent} from "./suggested-scales.component";

const routes: Routes = [
  {
    path: '',
    component: SuggestedScalesComponent,
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
export class SuggestedScalesRoutingModule {
}

