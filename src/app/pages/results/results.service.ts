import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResultsService{

  constructor(private http: HttpClient) { }



  loadLeagueData(leagueId: number){
     return this.http.get(`https://spo.handball4all.de/service/if_g_json.php?ca=1&cl=${leagueId}&cmd=ps&og=56`)
  }

}
