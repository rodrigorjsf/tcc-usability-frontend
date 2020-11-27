import {NgModule} from '@angular/core';
import {ThemeModule} from "../../@theme/theme.module";
import {NbAccordionModule, NbButtonModule, NbCardModule} from "@nebular/theme";
import {SuggestedScalesComponent} from "./suggested-scales.component";
import {SuggestedScalesRoutingModule} from "./suggested-scales-routing.module";


@NgModule({
  declarations: [
    SuggestedScalesComponent,
  ],
  imports: [
    SuggestedScalesRoutingModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbAccordionModule,
  ],
})
export class SuggestedScalesModule {
}
