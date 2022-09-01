import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {ActivatedRoute} from "@angular/router";
import moment from 'moment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  private querySubscription: Subscription;
  public currentAppointmentId: string;
  public appointmentTitel: string;
  public appointmentDate: string;
  public appointmentFileUrl: string;
  public content: any;

  constructor(
    private apollo: Apollo,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    /*
     Extract the appointment id to prepare graphql query
     */
    this.activeRoute.params.subscribe(parameter => {
      this.currentAppointmentId = parameter['id'];
    });

    const GET_APPOINTMENT_DATA = gql `
      query{
        termine(id:${this.currentAppointmentId}){
          data {
            attributes {
              Thema,
              Datum,
              Beschreibung,
              Aussschreibung {
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
    `;
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_APPOINTMENT_DATA
    }).valueChanges.subscribe(({ data, loading }) => {
      this.appointmentTitel = data.termine.data.attributes.Thema;
      this.appointmentDate = moment(data.termine.data.attributes.Datum).lang("de").format('Do MMMM YYYY, hh:mm:ss');
      this.appointmentFileUrl = data.termine.data.attributes.Aussschreibung.data.attributes.url;
      this.content = data.termine.data.attributes.Beschreibung;
    });
  }

}
