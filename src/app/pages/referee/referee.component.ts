import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
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
  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
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
  }

}
