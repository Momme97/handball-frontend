import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";

const GET_APPOINTMENTS = gql`
  query{
  termines (sort: "Datum:desc",pagination: { start: 0, limit: 100 }) {
    data{
      id
      attributes {
        Thema,
        Datum
      }
    }
  }
}
`;


@Component({
  selector: 'app-appointment-widget',
  templateUrl: './appointment-widget.component.html',
  styleUrls: ['./appointment-widget.component.scss']
})

export class AppointmentWidgetComponent implements OnInit {
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
        /*
        Only render matches that are not in the past
         */
        let appointMentDate = moment(data.termines.data[i].attributes.Datum);
        let currentDate = moment();
        if(appointMentDate.isBefore(currentDate) !== true){
          let appointmentItem = {
            id:  data.termines.data[i].id,
            Thema: data.termines.data[i].attributes.Thema,
            Datum: moment(data.termines.data[i].attributes.Datum).lang("de").format('Do MMMM YYYY, h:mm:ss'),
          }
          this.appointmentList.push(
            appointmentItem
          )
        }

      }
      this.appointmentList.reverse();
      if(data.termines.data.length > 10){
        this.appointmentList.length = 10;
      }
    });
  }

}
