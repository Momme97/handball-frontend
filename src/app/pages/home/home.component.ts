import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Router } from "@angular/router";
import moment from "moment/moment";
import { environment } from "../../../environments/environment";
import {MixpanelService} from "../../global-services/mixpanel.service";
import { NumberAndFacts } from 'src/app/data-models/number-and-facts';
import { Staffel, Team } from 'src/app/data-models/staffeln';

const GET_GENERAL_POSTS = gql`
  query{
  neuigkeitenImVerbands(sort: "createdAt:desc"){
    data{
      id,
      attributes{
        Author,
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
const GET_YOUTH_POSTS = gql`
   query{
    newsJugends(sort: "createdAt:desc"){
      data {
        id,
        attributes {
          Titel,
          Author,
          Artikelbild {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;
const GET_SELECTION_SQUAD_POSTS = gql`
   query{
    newsAuswahlkaders(sort: "createdAt:desc") {
      data {
        id,
        attributes {
          Titel,
          Author,
          Artikelbild {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;

const GET_REFEREE_POSTS = gql`
   query{
    newsSchiedsrichters(sort: "createdAt:desc") {
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
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: any[] = [];
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
  ngOnDestroy(): void {
      this.posts = [];
  }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_GENERAL_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {
        for(let i = 0; i < data.neuigkeitenImVerbands.data.length; i++){
          console.log(data.neuigkeitenImVerbands.data);
          // Check for existing article image
          let articleImageUrl: string;
          if(data.neuigkeitenImVerbands.data[i].attributes.Artikelbild.data === null){
            articleImageUrl = "/assets/placeholder.jpg";
          }else {
            articleImageUrl = environment.strapiUrl + data.neuigkeitenImVerbands.data[i].attributes.Artikelbild.data.attributes.url;
          }
          let postItem = {
            id: data.neuigkeitenImVerbands.data[i].id,
            type: "general",
            author: data.neuigkeitenImVerbands.data[i].attributes.Author,
            Titel: data.neuigkeitenImVerbands.data[i].attributes.Titel,
            Kurzbeschreibung: data.neuigkeitenImVerbands.data[i].attributes.Kurzbeschreibung,
            Artikelbild: articleImageUrl,
            createdAt: data.neuigkeitenImVerbands.data[i].attributes.createdAt
          }
          this.posts.push(
            postItem
          );

        }
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_YOUTH_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {
        for(let i = 0; i < data.newsJugends.data.length; i++){
          // Check for existing article image
          let articleImageUrl: string;
          if(data.newsJugends.data[i].attributes.Artikelbild.data === null){
            articleImageUrl = "/assets/placeholder.jpg";
          }else {
            articleImageUrl = environment.strapiUrl + data.newsJugends.data[i].attributes.Artikelbild.data.attributes.url;
          }

          let postItem = {
            id: data.newsJugends.data[i].id,
            type: "jugend",
            author: data.newsJugends.data[i].attributes.Author,
            Titel: data.newsJugends.data[i].attributes.Titel,
            Kurzbeschreibung: data.newsJugends.data[i].attributes.Kurzbeschreibung,
            Artikelbild: articleImageUrl,
            createdAt: data.newsJugends.data[i].attributes.createdAt
          }
          this.posts.push(
            postItem
          );

        }
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_SELECTION_SQUAD_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {
        for(let i = 0; i < data.newsAuswahlkaders.data.length; i++){
          // Check for existing article image
          let articleImageUrl: string;
          if(data.newsAuswahlkaders.data[i].attributes.Artikelbild.data === null){
            articleImageUrl = "/assets/placeholder.jpg";
          }else {
            articleImageUrl = environment.strapiUrl + data.newsAuswahlkaders.data[i].attributes.Artikelbild.data.attributes.url;
          }
          let postItem = {
            id: data.newsAuswahlkaders.data[i].id,
            type: "auswahlkader",
            author: data.newsAuswahlkaders.data[i].attributes.Author,
            Titel: data.newsAuswahlkaders.data[i].attributes.Titel,
            Kurzbeschreibung: data.newsAuswahlkaders.data[i].attributes.Kurzbeschreibung,
            Artikelbild: articleImageUrl,
            createdAt: data.newsAuswahlkaders.data[i].attributes.createdAt
          }
          this.posts.push(
            postItem
          );

        }
    });
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_REFEREE_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {
        for(let i = 0; i < data.newsSchiedsrichters.data.length; i++){
          // Check for existing article image
          let articleImageUrl: string;
          if(data.newsSchiedsrichters.data[i].attributes.Artikelbild.data === null){
            articleImageUrl = "/assets/placeholder.jpg";
          }else {
            articleImageUrl = environment.strapiUrl + data.newsSchiedsrichters.data[i].attributes.Artikelbild.data.attributes.url;
          }
          let postItem = {
            id: data.newsSchiedsrichters.data[i].id,
            type: "schiedsrichter",
            author: data.newsSchiedsrichters.data[i].attributes.Author,
            Titel: data.newsSchiedsrichters.data[i].attributes.Titel,
            Kurzbeschreibung: data.newsSchiedsrichters.data[i].attributes.Kurzbeschreibung,
            Artikelbild: articleImageUrl,
            createdAt: data.newsSchiedsrichters.data[i].attributes.createdAt
          }
          this.posts.push(
            postItem
          );
        
        }
        //sort posts by date descending
        this.posts.sort((a, b) => {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        
        
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
