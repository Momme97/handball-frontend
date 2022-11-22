import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
import { MixpanelService } from 'src/app/global-services/mixpanel.service';
import { Router } from '@angular/router';
const GET_POSTS = gql`
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

const GET_TEAMS = gql`
   query{
    auswahlkader {
      data {
        attributes {
          Teams {
            ...on ComponentMannschaftMannschaft {
              Mannschaftsname,
              Trainer,
              Teambild {
                data {
                  attributes {
                    url
                  }
                }
              }
              Trikots {
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

@Component({
  selector: 'app-selection-squad',
  templateUrl: './selection-squad.component.html',
  styleUrls: ['./selection-squad.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class SelectionSquadComponent implements OnInit {
  private querySubscription: Subscription;
  posts: any = [];
  selectionSquadTeams: any;
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
      for(let i = 0; i < data.newsAuswahlkaders.data.length; i++){
        let postItem = {
          id: data.newsAuswahlkaders.data[i].id,
          Titel: data.newsAuswahlkaders.data[i].attributes.Titel,
          Artikelbild: environment.strapiUrl + data.newsAuswahlkaders.data[i].attributes.Artikelbild.data.attributes.url,
          createdAt: moment(data.newsAuswahlkaders.data[i].attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss')
        }
        this.posts.push(
          postItem
        );
      }
      this.posts.reverse();
      if(data.newsAuswahlkaders.data.length > 10){
        this.posts.length = 10;
      }
    });

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_TEAMS
    }).valueChanges.subscribe(({ data, loading }) => {
      this.selectionSquadTeams = data.auswahlkader.data.attributes.Teams;
      console.log(this.selectionSquadTeams);

    });
  }

}
