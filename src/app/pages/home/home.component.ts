import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Router } from "@angular/router";
import moment from "moment/moment";
import {animate, style, transition, trigger} from "@angular/animations";
import { environment } from "../../../environments/environment";
import {MixpanelService} from "../../global-services/mixpanel.service";

const GET_POSTS = gql`
  query{
  neuigkeitenImVerbands{
    data{
      id,
      attributes{
        Titel,
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
  sponsoren{
    data{
      attributes{
        Titel,
        Sponsoren {
          ...on ComponentSponsorenSponsoren{
            Name,
            Verlinkung
            Logo{
              data {
                attributes{
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
            Artikelbild: environment.strapiUrl + data.neuigkeitenImVerbands.data[i].attributes.Artikelbild.data.attributes.url,
            createdAt: moment(data.neuigkeitenImVerbands.data[i].attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss')
          }
          this.posts.push(
            postItem
          );

        }
    this.posts.reverse();
    if(data.neuigkeitenImVerbands.data.length > 10){
      this.posts.length = 10;
    }
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_SPONSORS
    }).valueChanges.subscribe(({ data, loading }) => {

      for(let i = 0; i <  data.sponsoren.data.attributes.Sponsoren.length; i++) {
        this.sponsors.push({
          imageUrl: environment.strapiUrl + data.sponsoren.data.attributes.Sponsoren[i].Logo.data.attributes.url,
          link: data.sponsoren.data.attributes.Sponsoren[i].Verlinkung
        });
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
