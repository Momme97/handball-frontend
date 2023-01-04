import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import {environment} from "../../../environments/environment";
import { Router } from '@angular/router';
import { MixpanelService } from 'src/app/global-services/mixpanel.service';
const GET_POSTS = gql`
   query{
    newsTrainers {
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
          createdAt,

        }
      }
    }
  }
`;

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
})
export class TrainerComponent implements OnInit {

  private querySubscription: Subscription;
  posts: any = [];

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

      for(let i = 0; i < data.newsTrainers.data.length; i++){
        let postItem = {
          id: data.newsTrainers.data[i].id,
          Titel: data.newsTrainers.data[i].attributes.Titel,
          Artikelbild: environment.strapiUrl + data.newsTrainers.data[i].attributes.Artikelbild.data.attributes.url,
          createdAt: moment(data.newsTrainers.data[i].attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss')
        }
        this.posts.push(
          postItem
        );
      }
      this.posts.reverse();
      if(data.newsTrainers.data.length > 10){
        this.posts.length = 10;
      }
    });
  }

}
