import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";

const GET_APPOINTMENTS = gql`
  query{
  termines (sort: "Datum:asc",pagination: { start: 0, limit: 100 }) {
    data{
      id
      attributes {
        Thema,
        Datum,
        Hinweis
      }
    }
  }
}
`;
@Component({
  selector: 'app-appointment-archive',
  templateUrl: './appointment-archive.component.html',
  styleUrls: ['./appointment-archive.component.scss']
})
export class AppointmentArchiveComponent implements OnInit {
  private querySubscription: Subscription;
  public appointmentList: any = [];

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_APPOINTMENTS
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.termines.data.length; i++){
          let appointmentItem = {
            id:  data.termines.data[i].id,
            Hinweis: data.termines.data[i].attributes.Hinweis,
            Thema: data.termines.data[i].attributes.Thema,
            Datum: moment(data.termines.data[i].attributes.Datum).lang("de").format('Do MMMM YYYY'),
          }
          this.appointmentList.push(
            appointmentItem
          )
        }
        console.log(this.appointmentList);
      }
    );
  }

}
