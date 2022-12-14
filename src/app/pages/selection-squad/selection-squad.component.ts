import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import moment from "moment/moment";
import {environment} from "../../../environments/environment";
import { MixpanelService } from 'src/app/global-services/mixpanel.service';
import { Router } from '@angular/router';
import { QualifiedPerson } from 'src/app/data-models/qualified-person';
const GET_POSTS = gql`
   query{
    newsAuswahlkaders {
      data {
        id,
        attributes {
          Titel,
          Artikelbild {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;

const GET_QUALIFIED_PERSONS = gql`
query{
  auswahlkader {
    data {
      attributes {
        Ansprechpartner {
          ...on ComponentDetailPersonDetailPerson {
            Position,
            Vorname,
            Nachname,
            email,
            Handynummer,
            Profilbild {
              data {
                attributes {
                  url
                }
              }
            }
            Kurzbeschreibung
          }
        }
      }
    }
  }
}
`;



@Component({
  selector: 'app-selection-squad',
  templateUrl: './selection-squad.component.html',
  styleUrls: ['./selection-squad.component.scss'],
})
export class SelectionSquadComponent implements OnInit {
  private querySubscription: Subscription;
  posts: any = [];
  selectionSquadTeams: any;
  qualifiedPersons: QualifiedPerson[] = [];

  constructor(
    private apollo: Apollo,
    private mixpanelService: MixpanelService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POSTS
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.newsAuswahlkaders.data.length; i++){
         // Check for existing article image
         let articleImageUrl: string;
         if(data.newsAuswahlkaders.data[i].attributes.Artikelbild.data === null){
           articleImageUrl = "/assets/placeholder.jpg";
         }else {
           articleImageUrl = environment.strapiUrl + data.newsAuswahlkaders.data[i].attributes.Artikelbild.data.attributes.url;
         }
        let postItem = {
          id: data.newsAuswahlkaders.data[i].id,
          Titel: data.newsAuswahlkaders.data[i].attributes.Titel,
          Artikelbild: articleImageUrl,
          createdAt: moment(data.newsAuswahlkaders.data[i].attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss')
        }
        this.posts.push(
          postItem
        );
      }
      this.posts.reverse();
      if(data.newsAuswahlkaders.data.length > 10){
        this.posts.length = 10;
      }
    });

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_QUALIFIED_PERSONS
    }).valueChanges.subscribe(({ data, loading }) => {
      this.selectionSquadTeams = data.auswahlkader.data.attributes.Teams;
      for(let i = 0; i < data.auswahlkader.data.attributes.Ansprechpartner.length; i++){
        let profileImage: string | undefined;
        if(data.auswahlkader.data.attributes.Ansprechpartner[i].Profilbild.data !== null){
          profileImage = data.auswahlkader.data.attributes.Ansprechpartner[i].Profilbild?.data.attributes.url
        }else if(data.auswahlkader.data.attributes.Ansprechpartner[i].Profilbild.data === null){
          profileImage= undefined;
        }
        this.qualifiedPersons.push({
          position: data.auswahlkader.data.attributes.Ansprechpartner[i].Position,
          summary: data.auswahlkader.data.attributes.Ansprechpartner[i].Kurzbeschreibung,
          name: data.auswahlkader.data.attributes.Ansprechpartner[i].Vorname,
          surname: data.auswahlkader.data.attributes.Ansprechpartner[i].Nachname,
          email: data.auswahlkader.data.attributes.Ansprechpartner[i].email,
          mobile: data.auswahlkader.data.attributes.Ansprechpartner[i].Handynummer,
          profilImage: profileImage,
        })
      }
    });
  }

}
