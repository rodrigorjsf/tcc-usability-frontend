import {NgModule} from '@angular/core';
import {ThemeModule} from "../../@theme/theme.module";
import {NbAccordionModule, NbButtonModule, NbCardModule} from "@nebular/theme";
import {ReferencesRoutingModule} from "./references-routing.module";
import {ReferencesComponent} from "./references.component";


@NgModule({
  declarations: [
    ReferencesComponent,
  ],
  imports: [
    ReferencesRoutingModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbAccordionModule,
  ],
})
export class ReferencesModule {
}
