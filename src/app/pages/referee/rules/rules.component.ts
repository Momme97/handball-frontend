import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { QualifiedPerson } from 'src/app/data-models/qualified-person';

const GET_RULES_CMS_DATA = gql `
  query{
    schiedsrichterRegelwerk {
      data {
        attributes {
          Titel,
          Textbereich
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
        }
      }
    }
  }
`;

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  private querySubscription: Subscription;
  public AnsprechpartnerListe: QualifiedPerson[] = [];

  textareaData: any;
  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_RULES_CMS_DATA
    }).valueChanges.subscribe(({ data, loading }) => {
      console.log(data.schiedsrichterRegelwerk.data.attributes.Ansprechpartner)
      data.schiedsrichterRegelwerk.data.attributes.Ansprechpartner.forEach(person => {
        this.AnsprechpartnerListe.push({
          position: person.position,
          name: person.Vorname,
          surname: person.Nachname,
          email: person.Email,
          mobile: person.Handynummer,
          profilImage: person.Profilbild.data?.attributes.url        })
      })
      this.textareaData = JSON.parse(data.schiedsrichterRegelwerk.data.attributes.Textbereich);
    });
  }

}
