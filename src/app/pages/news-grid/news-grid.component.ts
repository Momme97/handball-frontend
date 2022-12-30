import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql, TypedDocumentNode } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { environment } from "../../../environments/environment";
import moment from "moment/moment";

const GET_GENERALPOSTS = gql`
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
const GET_YOUTH_POSTS = gql`
   query{
    newsJugends {
      data {
        id
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
    newsAuswahlkaders {
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
          }
          createdAt
        }
      }
    }
  }
`;

const GET_REFEREE_POSTS = gql`
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
@Component({
  selector: 'app-news-grid',
  templateUrl: './news-grid.component.html',
  styleUrls: ['./news-grid.component.scss']
})
export class NewsGridComponent implements OnInit {
  private querySubscription: Subscription;
  newsCategory: string;
  pageTitle:string;
  posts: any = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private apollo: Apollo,

  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(parameter => {
      this.newsCategory = parameter['newsCategory'];
    });

    let queryString: any;

    switch(this.newsCategory) {
      case 'general':
        queryString = GET_GENERALPOSTS;
        this.pageTitle = 'Nachrichten im Verband';
        break;

    }

    if(this.newsCategory === 'general'){

      this.querySubscription = this.apollo.watchQuery<any>({
        query: queryString
      }).valueChanges.subscribe(({ data, loading }) => {
          for(let i = 0; i < data.neuigkeitenImVerbands.data.length; i++){
            let postItem = {
              id: data.neuigkeitenImVerbands.data[i].id,
              type: "general",
              Titel: data.neuigkeitenImVerbands.data[i].attributes.Titel,
              Kurzbeschreibung: data.neuigkeitenImVerbands.data[i].attributes.Kurzbeschreibung,
              Artikelbild: environment.strapiUrl + data.neuigkeitenImVerbands.data[i].attributes.Artikelbild.data.attributes.url,
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
            let postItem = {
              id: data.newsJugends.data[i].id,
              type: "jugend",
              Titel: data.newsJugends.data[i].attributes.Titel,
              Kurzbeschreibung: data.newsJugends.data[i].attributes.Kurzbeschreibung,
              Artikelbild: environment.strapiUrl + data.newsJugends.data[i].attributes.Artikelbild.data.attributes.url,
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
            let postItem = {
              id: data.newsAuswahlkaders.data[i].id,
              type: "auswahlkader",
              Titel: data.newsAuswahlkaders.data[i].attributes.Titel,
              Kurzbeschreibung: data.newsAuswahlkaders.data[i].attributes.Kurzbeschreibung,
              Artikelbild: environment.strapiUrl + data.newsAuswahlkaders.data[i].attributes.Artikelbild.data.attributes.url,
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
            let postItem = {
              id: data.newsSchiedsrichters.data[i].id,
              type: "schiedsrichter",
              Titel: data.newsSchiedsrichters.data[i].attributes.Titel,
              Kurzbeschreibung: data.newsSchiedsrichters.data[i].attributes.Kurzbeschreibung,
              Artikelbild: environment.strapiUrl + data.newsSchiedsrichters.data[i].attributes.Artikelbild.data.attributes.url,
              createdAt: data.newsSchiedsrichters.data[i].attributes.createdAt
            }
            this.posts.push(
              postItem
            );
          //sort post by date desc
          const newArr = this.posts.sort((a, b) => {
            return moment(b.createdAt).diff(a.createdAt);
          });
          }
      });
    }
    /*
    
    this.querySubscription = this.apollo.watchQuery<any>({
      query: queryString
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
    });
    */
    console.log(this.posts);
    
  }

}
