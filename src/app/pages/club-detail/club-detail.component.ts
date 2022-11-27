import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
import {MixpanelService} from "../../global-services/mixpanel.service";
import { Gynasium } from 'src/app/data-models/gymnasium';
@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class ClubDetailComponent implements OnInit {
  public env = environment;
  private querySubscription: Subscription;
  clubId: string;
  clubName: string;
  clubWebsiteName: string;
  clubWebsiteUrl: string;
  clubLogoUrl: string;
  address: {street: string, housenumber: string, zip: string, city: string} = {street: '', housenumber: '', zip: '', city: ''};
  teamList: any = [];
  qualifiedPersonList: any;
  gymnasiumList: Gynasium[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private apollo: Apollo,
    private location: Location,
    private router: Router,
    private mixpanelService: MixpanelService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(parameter => {
      this.clubId = parameter['id'];
    });

    const GET_CLUB_DETAIL = gql `
    query{
      vereine(id:${this.clubId}) {
        data {
          id,
          attributes {
            Vereinsname,
            WebseitenUrl,
            Webseitenanzeigename,
            strasse,
            Stadt,
            Hausnummer,
            Postleitzahl,
            Logo {
              data {
                attributes {
                  url
                }
              }
            },
                Ansprechpartner {
              ...on ComponentPersonPerson {
                Position,
                Vorname,
                Nachname,
                Email,
                Handynummer,
                Profilbild {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
            Sporthallen {
              ...on ComponentSporthalleSporthalle {
                Name,
                Lat,
                Long,
                Bild {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
            Mannschaften {
              ...on ComponentMannschaftMannschaft {
                Mannschaftsname,
                Teambild {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                Trikots {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                Trainer
              }
            }
          }
        }
      }
    }
    `;

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_CLUB_DETAIL
    }).valueChanges.subscribe(({ data, loading }) => {
      this.clubName = data.vereine.data.attributes.Vereinsname;
      this.clubWebsiteName = data.vereine.data.attributes.Webseitenanzeigename;
      this.clubWebsiteUrl = data.vereine.data.attributes.WebseitenUrl;
      this.clubLogoUrl = environment.strapiUrl + data.vereine.data.attributes.Logo.data.attributes.url;
      this.teamList = data.vereine.data.attributes.Mannschaften;
      this.qualifiedPersonList = data.vereine.data.attributes.Ansprechpartner;
      console.log(data.vereine.data.attributes);
      this.address.street = data.vereine.data.attributes.strasse;
      this.address.housenumber = data.vereine.data.attributes.Hausnummer;
      this.address.zip = data.vereine.data.attributes.Postleitzahl;
      this.address.city = data.vereine.data.attributes.Stadt;

      //Fill Gymnasium List
      for(let i = 0; i < data.vereine.data.attributes.Sporthallen.length; i++){
        this.gymnasiumList.push({
          name: data.vereine.data.attributes.Sporthallen[i].Name,
          lat: data.vereine.data.attributes.Sporthallen[i].Lat,
          long: data.vereine.data.attributes.Sporthallen[i].Long,
          image: environment.strapiUrl + data.vereine.data.attributes.Sporthallen[i].Bild.data.attributes.url
        })
      }


      /* --------------------------------------------
         Track page visted with mixpanel service
       -------------------------------------------- */
          this.mixpanelService.init();
          this.mixpanelService.track('Pagevisited',{
            location: this.router.url,
            clubName: this.clubName
          })
    });
  }

  navigateBack(){
    this.location.back();
  }

}
