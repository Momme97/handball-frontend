import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import { environment } from "../../../environments/environment";
const GET_UPCOMMINGMATCHES = gql`
  query{
  anstehendeSpieles(sort: "Spieltermin:desc",pagination: { start: 0, limit: 100 }){
    data{
      id
      attributes {
        LogoHeim{
          data{
            attributes{
              url
            }
          }
        }
        Heimmannschaft,
        Auswaertsmannschaft,
        LogoAuswaerts{
          data{
            attributes{
              url
            }
          }
        }
        Spieltermin,
        Ort,
        Abgesagt
      }
    }
  }
}
`;


@Component({
  selector: 'app-upcomming-matches',
  templateUrl: './upcomming-matches.component.html',
  styleUrls: ['./upcomming-matches.component.scss']
})
export class UpcommingMatchesComponent implements OnInit {

  private querySubscription: Subscription;
  public matchesList: any = [];

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_UPCOMMINGMATCHES
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.anstehendeSpieles.data.length; i++){
        /*
        Only render matches that are not in the past
         */
        let spielTermin = moment(data.anstehendeSpieles.data[i].attributes.Spieltermin)
        let currentDate = moment();
        if(spielTermin.isBefore(currentDate) !== true){


          let LogoHeim = data.anstehendeSpieles.data[i].attributes.LogoHeim.data.attributes.url;
          let LogoAuswaerts = environment.strapiUrl + data.anstehendeSpieles.data[i].attributes.LogoAuswaerts.data.attributes.url;




          let matchObject = {
            canceled: data.anstehendeSpieles.data[i].attributes.Abgesagt,
            Heimmannschaft: data.anstehendeSpieles.data[i].attributes.Heimmannschaft,
            LogoHeim: environment.strapiUrl + LogoHeim,
            Auswaertsmannschaft: data.anstehendeSpieles.data[i].attributes.Auswaertsmannschaft,
            LogoAuswaerts: LogoAuswaerts,
            Spieltermin: moment(data.anstehendeSpieles.data[i].attributes.Spieltermin).lang("de").format('Do MMMM YYYY, h:mm:ss'),
            Ort: data.anstehendeSpieles.data[i].attributes.Ort,
          }
          this.matchesList.push(
            matchObject
          )
        }
      }
      this.matchesList.reverse();
      if(data.anstehendeSpieles.data.length > 15) {
        this.matchesList.length = 15;
      }
    });
  }

}
