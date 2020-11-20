import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import {NbCardModule, NbIconModule} from '@nebular/theme';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NgxEchartsModule,
    NbIconModule,
    NbCardModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
