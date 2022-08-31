import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import { ResultsService } from "./results.service";
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {MixpanelService} from "../../global-services/mixpanel.service";
import {Router} from "@angular/router";

const GET_LIGEN = gql `
query{
  handball4All{
    data{
      attributes {
        Ligen {
          ...on ComponentHandball4AllLigaHandball4AllLiga {
            Liganame,
            LigaId
          }
        }
      }
    }
  }
}
`;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class ResultsComponent implements OnInit {
  private querySubscription: Subscription;
  cmsLeagueList: any;
  matchResultList: any;

  constructor(
    public results:ResultsService,
    private apollo: Apollo,
    private router: Router,
    private mixpanelService: MixpanelService

  ) { }

  ngOnInit(): void {
    /* --------------------------------------------
      Track page visted with mixpanel service
    -------------------------------------------- */
    this.mixpanelService.init();
    this.mixpanelService.track('Pagevisited',{
      location: this.router.url
    })
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_LIGEN
    }).valueChanges.subscribe(({ data, loading }) => {
      this.cmsLeagueList = data.handball4All.data.attributes.Ligen;
      if(this.matchResultList.length === 0){
        for(let i = 0 ; i <  this.cmsLeagueList.length; i++){
          this.results.loadLeagueData(this.cmsLeagueList[i].LigaId);
        }
      }

    });


    this.matchResultList = this.results.getMatchResults();
    console.log(this.matchResultList)

  }

}
