import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../../guards/admin.guard';
import {ReferencesComponent} from "./references.component";

const routes: Routes = [
  {
    path: '',
    component: ReferencesComponent,
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
export class ReferencesRoutingModule {
}

