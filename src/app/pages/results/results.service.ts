import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResultsService{
  matchResults: any = [];

  constructor(private http: HttpClient) { }

  getMatchResults(){
    return this.matchResults;
  }



  loadLeagueData(leagueId: number){
    this.http.get(`https://spo.handball4all.de/service/if_g_json.php?ca=1&cl=${leagueId}&cmd=ps&og=56`).subscribe(resp => {
      const resultsArray = resp[0].content.futureGames.games;
      this.matchResults.push({
        ligaTitel: resp[0].head.name,
        results: resultsArray
      })
    })
  }



}
