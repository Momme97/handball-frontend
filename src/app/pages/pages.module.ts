import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import {RouterModule} from "@angular/router";
import {MarkdownModule} from "ngx-markdown";
import { ImpressComponent } from './impress/impress.component';
import { YouthComponent } from './youth/youth.component';
import { SelectionSquadComponent } from './selection-squad/selection-squad.component';
import { RefereeComponent } from './referee/referee.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ResultsComponent } from './results/results.component';
import {ComponentsModule} from "../components/components.module";
import { AppointmentComponent } from './appointment/appointment.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    ArticleComponent,
    ImpressComponent,
    YouthComponent,
    SelectionSquadComponent,
    RefereeComponent,
    TrainerComponent,
    ResultsComponent,
    AppointmentComponent,
    ClubsComponent,
    ClubDetailComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule,
    ComponentsModule
  ]
})
export class PagesModule { }
