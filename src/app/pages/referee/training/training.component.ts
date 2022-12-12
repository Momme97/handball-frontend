import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { QualifiedPerson } from 'src/app/data-models/qualified-person';
const GET_QUALIFIED_PERSONLIST = gql `
query {
  schiedsrichterFortbildung {
    data {
      attributes {
        Ansprechpartner {
          ...on ComponentPersonPerson {
            Vorname,
            Nachname,
            Position,
            Email,
            Handynummer,
            Profilbild {
              data {
                attributes{url}
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
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  private querySubscription: Subscription;
  public AnsprechpartnerListe: QualifiedPerson[] = [];
  constructor(
    private apollo: Apollo,

  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_QUALIFIED_PERSONLIST
    }).valueChanges.subscribe(({ data, loading }) => {
      console.log(data.schiedsrichterFortbildung.data.attributes.Ansprechpartner);
      data.schiedsrichterFortbildung.data.attributes.Ansprechpartner.forEach(person => {
        this.AnsprechpartnerListe.push({
          position: person.position,
          name: person.Vorname,
          surname: person.Nachname,
          email: person.Email,
          mobile: person.Handynummer,
          profilImage: person.Profilbild.data?.attributes.url     
        })
      })
    });
  }

}
