import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RefereeComponent} from "./referee.component";
import {ComponentsModule} from "../../components/components.module";
import {RouterModule} from "@angular/router";
import { CentralBasicTrainingComponent } from './central-basic-training/central-basic-training.component';
import { TrainingComponent } from './training/training.component';
import { RulesComponent } from './rules/rules.component';



@NgModule({
  declarations: [
    RefereeComponent,
    CentralBasicTrainingComponent,
    TrainingComponent,
    RulesComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
})
export class RefereeModule { }
