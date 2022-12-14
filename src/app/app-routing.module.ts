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
      { path: '', component: HomeComponent, title: 'Home | HG Region F??rde' },
      { path: 'ergebnisse', component: ResultsComponent, title: 'Spielergebnisse | HG Region F??rde' },
      { path: 'verband', component: AssociationComponent, title: 'Verband | HG Region F??rde' },
      { path: 'vereine', component: ClubsComponent, title: 'Vereine | HG Region F??rde' },
      { path: 'jugend', component: YouthComponent , title: 'Jugend | HG Region F??rde'},
      { path: 'auswahl-kader', component: SelectionSquadComponent, title: 'Auswahlkader | HG Region F??rde' },
      { path: 'spielbetrieb', component: TrainerComponent, title: 'Trainer | HG Region F??rde' },
      { path: 'news-grid/:newsCategory', component: NewsGridComponent, title: 'Nachrichten ??bersicht | HG Region F??rde' },
      { path: 'termin-archiv', component: AppointmentArchiveComponent, title: 'Termin Archiv | HG Region F??rde' },
      { path: 'impressum', component: ImpressComponent, title: 'Impressum | HG Region F??rde' }
    ]
  },
  {
    path:'schiedsrichter',
    component: DefaultComponent,
    children: [
      { path: '', component: RefereeComponent, title: 'Schiedsrichter | HG Region F??rde' },
      { path: 'zentrale-grundausbildung', component: CentralBasicTrainingComponent, title: 'Zentrale Grundausbildung | HG Region F??rde' },
      { path: 'fortbildung', component: TrainingComponent, title: 'Fortbildung | HG Region F??rde' },
      { path: 'ausschuss', component: ComitteeComponent, title: 'Schiedsrichteraussschuss | HG Region F??rde' },
      { path: 'downloads', component: DownloadsComponent ,title: 'Downloads | HG Region F??rde' },
      { path: 'regelwerk', component: RulesComponent,title: 'Regelwerk | HG Region F??rde' }
    ]
  },
  {
    path:'sponsoring',
    component: DefaultComponent,
    children: [
      { path: '', component: SponsoringComponent, title: 'Sponsoring | HG Region F??rde' },
    ]
  },
  {
    path:'artikel',
    component: ArticleLayoutComponent,
    children: [
      { path: ':category/:id', component: ArticleComponent,title: 'Artikel | HG Region F??rde' }
    ]
  },
  {
    path:'termine',
    component: AppointmentLayoutComponent,
    children: [
      { path: ':id', component: AppointmentComponent,title: 'Termine | HG Region F??rde' }
    ]
  },
  {
    path:'vereine-detail',
    component: BlankLayoutComponent,
    children: [
      { path: ':id', component: ClubDetailComponent,title: 'Vereine | HG Region F??rde' }
    ]
  },
  {
    path:'spiel-detail',
    component: BlankLayoutComponent,
    children: [
      { path: '', component: MatchDetailComponent ,title: 'Spieldetails | HG Region F??rde' }
    ]
  },
  {
    path:'sponsoren',
    component: BlankLayoutComponent,
    children: [
      { path: ':id', component: SponsorDetailComponent,title: 'Sponsoren | HG Region F??rde' }
    ]
  },
  {
    path:'auth',
    component: BlankLayoutComponent,
    children: [
      { path: ':authType', component: AuthComponent,title: 'Authentifizierung | HG Region F??rde' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
}),
    LayoutsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
