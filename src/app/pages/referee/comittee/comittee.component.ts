import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const GET_COMITTEE_MEMBERLIST = gql `
  query{
    schiedsrichterauschuss {
      data {
        attributes {
          Mitglieder {
            ...on ComponentPersonPerson {
              Vorname,
              Nachname,
              Email,
              Handynummer,
              Position,
              Profilbild {
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
    }
  }
`;
@Component({
  selector: 'app-comittee',
  templateUrl: './comittee.component.html',
  styleUrls: ['./comittee.component.scss']
})

export class ComitteeComponent implements OnInit {
  private querySubscription: Subscription;
  memberlist: any[] = [];

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_COMITTEE_MEMBERLIST
    }).valueChanges.subscribe(({ data, loading }) => {
      this.memberlist = data.schiedsrichterauschuss.data.attributes.Mitglieder;
      console.log(data.schiedsrichterauschuss.data.attributes.Mitglieder)
    });
  }

}
