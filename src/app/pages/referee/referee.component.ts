import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
import {QualifiedPersons} from "../../data-models/qualified-persons";
import { Router } from '@angular/router';
import { MixpanelService } from 'src/app/global-services/mixpanel.service';
const GET_POSTS = gql`
   query{
    newsSchiedsrichters {
      data {
        id,
        attributes {
          Titel,
          Artikelbild {
            data {
              attributes {
                url
              }
            }
          },
          Author,
          createdAt
        }
      }
    }
  }
`;
const GET_SINGLE_PAGE_DATA = gql `
  query{
  schiedsrichter{
    data {
      attributes {
        Ansprechpartner {
        ...on ComponentPersonPerson {
            Vorname,
            Nachname,
            Position,
            Email,
            Handynummer,
            Profilbild {
                data {
                  attributes {
                    url
                  }
                }
              }
          }
        }
      }
    }
  }}
`;
@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class RefereeComponent implements OnInit {
  private querySubscription: Subscription;
  posts: any = [];
  qualifiedPersonList: QualifiedPersons[] = [];
  constructor(
    private apollo: Apollo,
    private mixpanelService: MixpanelService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    /* --------------------------------------------
      Track page visted with mixpanel service
    -------------------------------------------- */
    this.mixpanelService.init();
    this.mixpanelService.track('Pagevisited',{
      location: this.router.url
    });
    
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {

      for(let i = 0; i < data.newsSchiedsrichters.data.length; i++){
        let postItem = {
          id: data.newsSchiedsrichters.data[i].id,
          Titel: data.newsSchiedsrichters.data[i].attributes.Titel,
          Artikelbild: environment.strapiUrl + data.newsSchiedsrichters.data[i].attributes.Artikelbild.data.attributes.url,
          createdAt: moment(data.newsSchiedsrichters.data[i].attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss')
        }
        this.posts.push(
          postItem
        );
      }
      this.posts.reverse();
      if(data.newsSchiedsrichters.data.length > 10){
        this.posts.length = 10;
      }
    });

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_SINGLE_PAGE_DATA
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.schiedsrichter.data.attributes.Ansprechpartner.length; i++){
        this.qualifiedPersonList.push({
          position: data.schiedsrichter.data.attributes.Ansprechpartner[i].Position,
          vorname: data.schiedsrichter.data.attributes.Ansprechpartner[i].Vorname,
          nachname: data.schiedsrichter.data.attributes.Ansprechpartner[i].Nachname,
          handynummer: data.schiedsrichter.data.attributes.Ansprechpartner[i].Handynummer,
          email: data.schiedsrichter.data.attributes.Ansprechpartner[i].Email,
          profilbild: environment.strapiUrl + data.schiedsrichter.data.attributes.Ansprechpartner[i].Profilbild.data?.attributes.url
        })
      }
      console.log(this.qualifiedPersonList)
    });
  }

}
