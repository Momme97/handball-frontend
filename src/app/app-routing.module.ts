import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { DefaultComponent } from "./layouts/default/default.component";
import { LayoutsModule } from "./layouts/layouts.module";
import {ArticleComponent} from "./pages/article/article.component";
import {ArticleLayoutComponent} from "./layouts/article-layout/article-layout.component";
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
import {AuthComponent} from "./pages/auth/auth.component";
import {SponsorDetailComponent} from "./pages/sponsor-detail/sponsor-detail.component";
import {MatchDetailComponent} from "./pages/match-detail/match-detail.component";
import {CentralBasicTrainingComponent} from "./pages/referee/central-basic-training/central-basic-training.component";
import {TrainingComponent} from "./pages/referee/training/training.component";
import {RulesComponent} from "./pages/referee/rules/rules.component";
import { NewsGridComponent } from './pages/news-grid/news-grid.component';
import { SponsoringComponent } from './pages/sponsoring/sponsoring.component';
import { ComitteeComponent } from './pages/referee/comittee/comittee.component';
import { DownloadsComponent } from './pages/referee/downloads/downloads.component';
import { AppointmentArchiveComponent } from './pages/appointment-archive/appointment-archive.component';
import { AssociationComponent } from './pages/association/association.component';

const routes: Routes = [
  {
    path:'',
    component: DefaultComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Home | HG Region Förde' },
      { path: 'ergebnisse', component: ResultsComponent, title: 'Spielergebnisse | HG Region Förde' },
      { path: 'verband', component: AssociationComponent, title: 'Verband | HG Region Förde' },
      { path: 'vereine', component: ClubsComponent, title: 'Vereine | HG Region Förde' },
      { path: 'jugend', component: YouthComponent , title: 'Jugend | HG Region Förde'},
      { path: 'auswahl-kader', component: SelectionSquadComponent, title: 'Auswahlkader | HG Region Förde' },
      { path: 'spielbetrieb', component: TrainerComponent, title: 'Trainer | HG Region Förde' },
      { path: 'news-grid/:newsCategory', component: NewsGridComponent, title: 'Nachrichten Übersicht | HG Region Förde' },
      { path: 'termin-archiv', component: AppointmentArchiveComponent, title: 'Termin Archiv | HG Region Förde' },
      { path: 'impressum', component: ImpressComponent, title: 'Impressum | HG Region Förde' }
    ]
  },
  {
    path:'schiedsrichter',
    component: DefaultComponent,
    children: [
      { path: '', component: RefereeComponent, title: 'Schiedsrichter | HG Region Förde' },
      { path: 'zentrale-grundausbildung', component: CentralBasicTrainingComponent, title: 'Zentrale Grundausbildung | HG Region Förde' },
      { path: 'fortbildung', component: TrainingComponent, title: 'Fortbildung | HG Region Förde' },
      { path: 'ausschuss', component: ComitteeComponent, title: 'Schiedsrichteraussschuss | HG Region Förde' },
      { path: 'downloads', component: DownloadsComponent ,title: 'Downloads | HG Region Förde' },
      { path: 'regelwerk', component: RulesComponent,title: 'Regelwerk | HG Region Förde' }
    ]
  },
  {
    path:'sponsoring',
    component: DefaultComponent,
    children: [
      { path: '', component: SponsoringComponent, title: 'Sponsoring | HG Region Förde' },
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
      { path: ':id', component: AppointmentComponent,title: 'Termine | HG Region Förde' }
    ]
  },
  {
    path:'vereine-detail',
    component: BlankLayoutComponent,
    children: [
      { path: ':id', component: ClubDetailComponent,title: 'Vereine | HG Region Förde' }
    ]
  },
  {
    path:'spiel-detail',
    component: BlankLayoutComponent,
    children: [
      { path: '', component: MatchDetailComponent ,title: 'Spieldetails | HG Region Förde' }
    ]
  },
  {
    path:'sponsoren',
    component: BlankLayoutComponent,
    children: [
      { path: ':id', component: SponsorDetailComponent,title: 'Sponsoren | HG Region Förde' }
    ]
  },
  {
    path:'auth',
    component: BlankLayoutComponent,
    children: [
      { path: ':authType', component: AuthComponent,title: 'Authentifizierung | HG Region Förde' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
