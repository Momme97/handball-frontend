import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { DefaultComponent } from "./layouts/default/default.component";
import { LayoutsModule } from "./layouts/layouts.module";
import {ArticleComponent} from "./pages/article/article.component";
import {ArticleLayoutComponent} from "./layouts/article-layout/article-layout.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ImpressComponent} from "./pages/impress/impress.component";
import {YouthComponent} from "./pages/youth/youth.component";
import {SelectionSquadComponent} from "./pages/selection-squad/selection-squad.component";
import {RefereeComponent} from "./pages/referee/referee.component";
import {TrainerComponent} from "./pages/trainer/trainer.component";
import {ResultsComponent} from "./pages/results/results.component";
import {AppointmentComponent} from "./pages/appointment/appointment.component";
import {AppointmentLayoutComponent} from "./layouts/appointment-layout/appointment-layout.component";
import {ClubsComponent} from "./pages/clubs/clubs.component";
import {ClubDetailComponent} from "./pages/club-detail/club-detail.component";
import {BlankLayoutComponent} from "./layouts/blank-layout/blank-layout.component";

const routes: Routes = [
  {
    path:'',
    component: DefaultComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Home | HG Region Förde' },
      { path: 'ergebnisse', component: ResultsComponent, title: 'Spielergebnisse | HG Region Förde' },
      { path: 'vereine', component: ClubsComponent, title: 'Vereine | HG Region Förde' },
      { path: 'jugend', component: YouthComponent , title: 'Jugend | HG Region Förde'},
      { path: 'auswahl-kader', component: SelectionSquadComponent, title: 'Auswahlkader | HG Region Förde' },
      { path: 'schiedsrichter', component: RefereeComponent, title: 'Schiedsrichter | HG Region Förde' },
      { path: 'trainer', component: TrainerComponent, title: 'Trainer | HG Region Förde' },
      { path: 'impressum', component: ImpressComponent, title: 'Impressum | HG Region Förde' }
    ]
  },
  {
    path:'artikel',
    component: ArticleLayoutComponent,
    children: [
      { path: ':category/:id', component: ArticleComponent,title: 'Artikel | HG Region Förde' }
    ]
  },
  {
    path:'termine',
    component: AppointmentLayoutComponent,
    children: [
      { path: ':category/:id', component: AppointmentComponent,title: 'Termine | HG Region Förde' }
    ]
  },
  {
    path:'vereine-detail',
    component: BlankLayoutComponent,
    children: [
      { path: ':id', component: ClubDetailComponent,title: 'Vereine | HG Region Förde' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutsModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
