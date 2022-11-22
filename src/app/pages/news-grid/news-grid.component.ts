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
    this.posts.reverse();
    });
    console.log(this.posts);
    
  }

}
