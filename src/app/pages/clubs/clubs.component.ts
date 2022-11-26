import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {animate, style, transition, trigger} from "@angular/animations";
import { environment } from "../../../environments/environment";
import {Router} from "@angular/router";
import {MixpanelService} from "../../global-services/mixpanel.service";
const GET_CLUBLIST = gql `
  query{
    vereines(pagination: { page: 1, pageSize: 200 }) {
      data {
        id,
        attributes {
          Vereinsname,
          Logo {
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

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class ClubsComponent implements OnInit {
  private querySubscription: Subscription;
  public clubs: any = [];

  constructor(
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
      query: GET_CLUBLIST
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.vereines.data.length; i++){
        this.clubs.push({
          id: data.vereines.data[i].id,
          clubName: data.vereines.data[i].attributes.Vereinsname,
          clubLogo: environment.strapiUrl + data.vereines.data[i].attributes.Logo.data.attributes.url
        })
      }
      this.clubs.sort((a, b) => a.clubName.localeCompare(b.clubName))
    });
  }

}
