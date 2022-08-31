import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import {RouterModule} from "@angular/router";
import {ComponentsModule} from "../components/components.module";
import { ArticleLayoutComponent } from './article-layout/article-layout.component';
import { AppointmentLayoutComponent } from './appointment-layout/appointment-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';



@NgModule({
  declarations: [
    DefaultComponent,
    ArticleLayoutComponent,
    AppointmentLayoutComponent,
    BlankLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    DefaultComponent
  ]
})
export class LayoutsModule { }
