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
import { AuthComponent } from './auth/auth.component';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import {FormsModule} from "@angular/forms";
import {RefereeModule} from "./referee/referee.module";
import { NewsGridComponent } from './news-grid/news-grid.component';
import { SponsoringComponent } from './sponsoring/sponsoring.component';
import { AppointmentArchiveComponent } from './appointment-archive/appointment-archive.component';
import { AssociationComponent } from './association/association.component';


@NgModule({
    declarations: [
        HomeComponent,
        ArticleComponent,
        ImpressComponent,
        YouthComponent,
        SelectionSquadComponent,
        TrainerComponent,
        ResultsComponent,
        AppointmentComponent,
        ClubsComponent,
        ClubDetailComponent,
        AuthComponent,
        SponsorDetailComponent,
        MatchDetailComponent,
        NewsGridComponent,
        SponsoringComponent,
        AppointmentArchiveComponent,
        AssociationComponent,
    ],
    imports: [
        RefereeModule,
        CommonModule,
        RouterModule,
        MarkdownModule,
        ComponentsModule,
        FormsModule,
    ]
})
export class PagesModule { }
