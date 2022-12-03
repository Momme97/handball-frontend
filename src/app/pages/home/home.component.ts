import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Router } from "@angular/router";
import moment from "moment/moment";
import {animate, style, transition, trigger} from "@angular/animations";
import { environment } from "../../../environments/environment";
import {MixpanelService} from "../../global-services/mixpanel.service";
import { NumberAndFacts } from 'src/app/data-models/number-and-facts';
import { Staffel, Team } from 'src/app/data-models/staffeln';

const GET_POSTS = gql`
  query{
  neuigkeitenImVerbands{
    data{
      id,
      attributes{
        Titel,
        Kurzbeschreibung,
        createdAt
        Artikelbild{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
`;
const GET_SPONSORS = gql`
  query{
  sponsorens{
    data {
      id
      attributes {
        Name,
        Link,
        Logo {
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
`;
const GET_NUMBERSANDFACTS = gql`
query{
  zahlenUndFakten {
    data {
      attributes {
        Items {
          ...on ComponentFactItemFactItem {
            Titel,
            Icon {
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
  }
}
`;

const GET_STAFFELN = gql`
query{
  staffelns {
    data {
      attributes {
        Staffelname,
        Teams {
          ...on ComponentStaffelTeamStaffelTeam {
            Logo {
              data {
                attributes {
                  url
                }
              }
            }
            Teamname
          }
        }
      }
    }
  }
}
`;
const GET_HOMEGALLERY = gql`
  query{
  homeBildersammlung{
    data{
      attributes{
        Gallery{
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
`;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  posts: any = [];
  sponsors: any = [];
  homeGallery: any = [];
  numberAndFacts: NumberAndFacts[] = [];
  staffeln: Staffel[] = [];

  private querySubscription: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private mixpanelService: MixpanelService
  ) {}

  ngOnInit() {
    /* --------------------------------------------
      Track page visted with mixpanel service
    -------------------------------------------- */
    this.mixpanelService.init();
    this.mixpanelService.track('Pagevisited',{
      location: this.router.url
    })

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {
        for(let i = 0; i < data.neuigkeitenImVerbands.data.length; i++){
          let postItem = {
            id: data.neuigkeitenImVerbands.data[i].id,
            Titel: data.neuigkeitenImVerbands.data[i].attributes.Titel,
            Kurzbeschreibung: data.neuigkeitenImVerbands.data[i].attributes.Kurzbeschreibung,
            Artikelbild: environment.strapiUrl + data.neuigkeitenImVerbands.data[i].attributes.Artikelbild.data.attributes.url,
            createdAt: moment(data.neuigkeitenImVerbands.data[i].attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss')
          }
          this.posts.push(
            postItem
          );

        }
    this.posts.reverse();
    if(data.neuigkeitenImVerbands.data.length > 6){
      this.posts.length = 6;
    }
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_SPONSORS
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i <  data.sponsorens.data.length; i++) {
        this.sponsors.push({
          id: data.sponsorens.data[i].id,
          imageUrl: environment.strapiUrl + data.sponsorens.data[i].attributes.Logo.data.attributes.url
        });
      }
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_NUMBERSANDFACTS
    }).valueChanges.subscribe(({ data, loading }) => {      
      for(let i = 0; i < data.zahlenUndFakten.data.attributes.Items.length; i++) {
        this.numberAndFacts.push({
          title: data.zahlenUndFakten.data.attributes.Items[i].Titel,
          icon: environment.strapiUrl + data.zahlenUndFakten.data.attributes.Items[i].Icon.data.attributes.url
        })
      }
      
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_STAFFELN
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.staffelns.data.length; i++){
        let teamArray: Team[] = [];
        for(let x = 0; x < data.staffelns.data[i].attributes.Teams.length; x++) {
          teamArray.push({
            name: data.staffelns.data[i].attributes.Teams[x].Teamname,
            logo: environment.strapiUrl + data.staffelns.data[i].attributes.Teams[x].Logo.data.attributes.url
          })
        }
        this.staffeln.push({
          title: data.staffelns.data[i].attributes.Staffelname,
          teams: teamArray
        })
      }
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_HOMEGALLERY
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.homeBildersammlung.data.attributes.Gallery.data.length; i++){
        this.homeGallery.push({
          imageUrl: environment.strapiUrl + data.homeBildersammlung.data.attributes.Gallery.data[i].attributes.url
        })
      }
    });
  }
}
