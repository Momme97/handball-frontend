import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComponentsModule} from "./components/components.module";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {PagesModule} from "./pages/pages.module";
import { MarkdownModule } from 'ngx-markdown';
import {ResultsService} from "./pages/results/results.service";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    GraphQLModule,
    HttpClientModule,
    CommonModule,
    MarkdownModule.forRoot(),
  ],
  providers: [ResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
