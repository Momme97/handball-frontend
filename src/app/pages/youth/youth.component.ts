import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
const GET_POSTS = gql`
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
        }
      }
    }
  }
`;

const GET_SINGLE_PAGE_DATA = gql `
  query{
    jugend {
      data {
        attributes {
          Ansprechpartner {
            ...on ComponentPersonPerson {
              Vorname,
              Nachname,
              Position,
              Profilbild {
                data {
                  attributes {
                    url
                  }
                }
              }
              Email,
              Handynummer
            }
          },
          Contentblocks {
            ...on ComponentContentblockContentblock {
              Titel,
              Content
            }
          }
        }
      }
    }
  }
`;

@Component({
  selector: 'app-youth',
  templateUrl: './youth.component.html',
  styleUrls: ['./youth.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class YouthComponent implements OnInit {
  public env = environment;
  private querySubscription: Subscription;
  posts: any = [];
  ansprechpartner: any;
  Contentblocks:any;
  constructor(
    private apollo: Apollo,

  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.newsJugends.data.length; i++){
        let postItem = {
          id: data.newsJugends.data[i].id,
          Titel: data.newsJugends.data[i].attributes.Titel,
          Artikelbild: environment.strapiUrl + data.newsJugends.data[i].attributes.Artikelbild.data.attributes.url,
          createdAt: moment(data.newsJugends.data[i].attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss')
        }
        this.posts.push(
          postItem
        );
      }
      this.posts.reverse();
      if(data.newsJugends.data.length > 10){
        this.posts.length = 10;
      }
    });

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_SINGLE_PAGE_DATA
    }).valueChanges.subscribe(({ data, loading }) => {
      this.ansprechpartner = data.jugend.data.attributes.Ansprechpartner;
      console.log(this.ansprechpartner);
    });

  }

}
