import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import moment from "moment/moment";

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.scss']
})
export class SponsorDetailComponent implements OnInit {
  private querySubscription: Subscription;
  private currentSponsorId: string;
  public sponsorLogoUrl: string;
  public bannerUrl: string;
  public content: string;
  public linkUrl: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(parameter => {
      this.currentSponsorId = parameter['id'];
    });
    const GET_SPONSOR = gql `
      query{
        sponsoren(id:${this.currentSponsorId}){
          data {
            id
            attributes {
              Name,
              Link,
              Logo {
                data {
                  attributes {
                    url
                  }
                }
              }
              Banner {
                data {
                  attributes {
                    url
                  }
                }
              }
              Beschreibung
            }
          }
        }
      }
    `;

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_SPONSOR
    }).valueChanges.subscribe(({ data, loading }) => {
      this.bannerUrl = environment.strapiUrl + data.sponsoren.data.attributes.Banner.data.attributes.url;
      this.sponsorLogoUrl = environment.strapiUrl + data.sponsoren.data.attributes.Logo.data.attributes.url;
      this.content =  data.sponsoren.data.attributes.Beschreibung;
      this.linkUrl =  data.sponsoren.data.attributes.Link;
    });

  }

}
