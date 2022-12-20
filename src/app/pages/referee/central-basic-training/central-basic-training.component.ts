import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { QualifiedPerson } from 'src/app/data-models/qualified-person';
const GET_ANSPRECHPARTNER = gql`
query{
  schiedsrichterZentraleGrundausbildung {
    data {
      attributes {
        Textbereich,
        DasBekommstDu,
        DasSolltestDuMitbringen,
        Ansprechpartner{
          ...on ComponentPersonPerson {
            Vorname,
            Nachname,
            Position,
            Profilbild {
              data {
                attributes{url}
              }
            }
            Email,
            Handynummer
          }
        }
      }
    }
  }
}
`;
@Component({
  selector: 'app-central-basic-training',
  templateUrl: './central-basic-training.component.html',
  styleUrls: ['./central-basic-training.component.scss']
})
export class CentralBasicTrainingComponent implements OnInit {
  private querySubscription: Subscription;
  public AnsprechpartnerListe: QualifiedPerson[] = [];
  textblockJson: any;
  whatYouWillGetJson: any;
  whatYouWillNeedJson: any;
  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_ANSPRECHPARTNER
    }).valueChanges.subscribe(({ data, loading }) => {
      this.textblockJson = JSON.parse(data.schiedsrichterZentraleGrundausbildung.data.attributes.Textbereich);
      this.whatYouWillGetJson = JSON.parse(data.schiedsrichterZentraleGrundausbildung.data.attributes.DasBekommstDu);
      this.whatYouWillNeedJson = JSON.parse(data.schiedsrichterZentraleGrundausbildung.data.attributes.DasSolltestDuMitbringen);

      data.schiedsrichterZentraleGrundausbildung.data.attributes.Ansprechpartner.forEach(person => {
        this.AnsprechpartnerListe.push({
          position: person.position,
          name: person.Vorname,
          surname: person.Nachname,
          email: person.Email,
          mobile: person.Handynummer,
          profilImage: person.Profilbild.data?.attributes.url
        })
      });
    });

  }

}
