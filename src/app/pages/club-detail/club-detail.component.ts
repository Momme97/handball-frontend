import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
import {MixpanelService} from "../../global-services/mixpanel.service";
import { Gynasium } from 'src/app/data-models/gymnasium';
import { Team, Trikot } from 'src/app/data-models/staffeln';
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
  trainingsTimes: string;
  address: {street: string, housenumber: string, zip: string, city: string} = {street: '', housenumber: '', zip: '', city: ''};
  teamList: Team[] = [];
  qualifiedPersonList: any[] = [];
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
            Trainingszeiten
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
      //this.qualifiedPersonList = data.vereine.data.attributes.Ansprechpartner;
      this.address.street = data.vereine.data.attributes.strasse;
      this.address.housenumber = data.vereine.data.attributes.Hausnummer;
      this.address.zip = data.vereine.data.attributes.Postleitzahl;
      this.address.city = data.vereine.data.attributes.Stadt;
      this.trainingsTimes = JSON.parse(data.vereine.data.attributes.Trainingszeiten);


      for(let i = 0; i < data.vereine.data.attributes.Ansprechpartner.length; i++){
        this.qualifiedPersonList.push({
          position: data.vereine.data.attributes.Ansprechpartner[i].Position,
          name: data.vereine.data.attributes.Ansprechpartner[i].Vorname,
          surname: data.vereine.data.attributes.Ansprechpartner[i].Nachname,
          email: data.vereine.data.attributes.Ansprechpartner[i].Email,
          mobile: data.vereine.data.attributes.Ansprechpartner[i].Handynummer,
          profilePicture: environment.strapiUrl + data.vereine.data.attributes.Ansprechpartner[i].Profilbild.data?.attributes.url
        })
      }
      console.log(this.qualifiedPersonList);

      for(let i = 0; i < data.vereine.data.attributes.Mannschaften.length; i++){
        let trikotsList: Trikot[] = [];
        for(let x = 0; x < data.vereine.data.attributes.Mannschaften[i].Trikots.data.length; x++){
          trikotsList.push({
            imageUrl: environment.strapiUrl + data.vereine.data.attributes.Mannschaften[i].Trikots?.data[x].attributes.url
          });
        }

        this.teamList.push({
          name: data.vereine.data.attributes.Mannschaften[i].Mannschaftsname,
          groupImage: environment.strapiUrl + data.vereine.data.attributes.Mannschaften[i].Teambild.data?.attributes.url,
          trainer: data.vereine.data.attributes.Mannschaften[i].Trainer,
          trikots: trikotsList
        })
      }

      //Fill Gymnasium List
      for(let i = 0; i < data.vereine.data.attributes.Sporthallen.length; i++){
        this.gymnasiumList.push({
          name: data.vereine.data.attributes.Sporthallen[i].Name,
          lat: data.vereine.data.attributes.Sporthallen[i].Lat,
          long: data.vereine.data.attributes.Sporthallen[i].Long,
          image: environment.strapiUrl + data.vereine.data.attributes.Sporthallen[i].Bild.data.attributes.url
        })
      }
    });
  }

  navigateBack(){
    this.location.back();
  }

}
