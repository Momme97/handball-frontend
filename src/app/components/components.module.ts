import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import {RouterModule} from "@angular/router";
import { QualifiedPersonCardComponent } from './qualified-person-card/qualified-person-card.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { AppointmentWidgetComponent } from './appointment-widget/appointment-widget.component';
import { UpcommingMatchesComponent } from './upcomming-matches/upcomming-matches.component';
import { PageLogoComponent } from './page-logo/page-logo.component';
import { ArticleFooterComponent } from './article-footer/article-footer.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { AppointmentHeaderComponent } from './appointment-header/appointment-header.component';
import { ClubCardComponent } from './club-card/club-card.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { SponsorHeaderComponent } from './sponsor-header/sponsor-header.component';
import { ButtonComponent } from './button/button.component';
import { FeaturedArticleCardComponent } from './featured-article-card/featured-article-card.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MarkdownModule } from 'ngx-markdown';
import { SubpageHeaderComponent } from './subpage-header/subpage-header.component';
import { EditorjsWrapperComponent } from './editorjs-wrapper/editorjs-wrapper.component';
import { ContactPersonListComponent } from './contact-person-list/contact-person-list.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ArticleHeaderComponent,
    QualifiedPersonCardComponent,
    PlayerCardComponent,
    AppointmentWidgetComponent,
    UpcommingMatchesComponent,
    PageLogoComponent,
    ArticleFooterComponent,
    NewsCardComponent,
    AppointmentHeaderComponent,
    ClubCardComponent,
    TeamCardComponent,
    SponsorHeaderComponent,
    ButtonComponent,
    FeaturedArticleCardComponent,
    MapComponent,
    SubpageHeaderComponent,
    EditorjsWrapperComponent,
    ContactPersonListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeafletModule,
    MarkdownModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ArticleHeaderComponent,
    QualifiedPersonCardComponent,
    PlayerCardComponent,
    AppointmentWidgetComponent,
    UpcommingMatchesComponent,
    PageLogoComponent,
    ArticleFooterComponent,
    NewsCardComponent,
    AppointmentHeaderComponent,
    ClubCardComponent,
    TeamCardComponent,
    SponsorHeaderComponent,
    ButtonComponent,
    FeaturedArticleCardComponent,
    MapComponent,
    SubpageHeaderComponent,
    EditorjsWrapperComponent,
    ContactPersonListComponent
  ]
})
export class ComponentsModule { }
