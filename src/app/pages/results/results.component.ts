import { Component, OnInit } from '@angular/core';
import { ResultsService } from "./results.service";
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {MixpanelService} from "../../global-services/mixpanel.service";
import {GameDetailsService} from "../../global-services/game-details.service";
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
})
export class ResultsComponent implements OnInit {
  private querySubscription: Subscription;
  selectedLeague: number;
  cmsLeagueList: { LigaId: number, Liganame: string } [];
  matchResultList: any;

  constructor(
    public results:ResultsService,
    private apollo: Apollo,
    private router: Router,
    private mixpanelService: MixpanelService,
    private gameDetailsService: GameDetailsService
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
      /*
      if(this.matchResultList.length === 0){
        for(let i = 0 ; i <  this.cmsLeagueList.length; i++){
          this.results.loadLeagueData(this.cmsLeagueList[i].LigaId);
        }
      }

       */
      console.log(this.cmsLeagueList);

    });




  }
  setActiveLeague() {
    this.results.loadLeagueData(this.selectedLeague).subscribe(results => {
      this.matchResultList = results[0].content.futureGames.games;
      console.log(results[0].content.futureGames.games);
    });
  }

  debug(){
    console.log(this.matchResultList);
  }

  openMatchDetails(resultItem: any){

    this.gameDetailsService.setGameData(
      {
        homeTeam: resultItem.gHomeTeam,
        guestTeam: resultItem.gGuestTeam
      }
    )

    this.router.navigate(['spiel-detail']);
  }

}
