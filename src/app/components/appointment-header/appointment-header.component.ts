import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-appointment-header',
  templateUrl: './appointment-header.component.html',
  styleUrls: ['./appointment-header.component.scss']
})
export class AppointmentHeaderComponent implements OnInit {
  private querySubscription: Subscription;
  private currentAppointmentId: any;
  private appointmentCategory:any;


  constructor(
    private apollo: Apollo,
    private activeRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(parameter => {
      this.currentAppointmentId = parameter['id'];
      this.appointmentCategory = parameter['category']
    });

    console.log(this.activeRoute.url)


    const GET_GENERAL_APPOINTMENT = gql`
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

  }

}
