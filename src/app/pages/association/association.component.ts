import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { environment } from 'src/environments/environment';

const GET_ASSOCIATION__DATA = gql `
query{
  verband {
  	data {
      attributes {
        Ansprechpartner {
          ...on ComponentPersonPerson{
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
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.scss']
})

   
export class AssociationComponent implements OnInit {
  public env = environment;
  private querySubscription: Subscription;
  qualifiedPersonList: any[] = [];

  constructor(
    private apollo: Apollo,

  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_ASSOCIATION__DATA
    }).valueChanges.subscribe(({ data, loading }) => {
      for(let i = 0; i < data.verband.data.attributes.Ansprechpartner.length; i++){
        this.qualifiedPersonList.push({
          position: data.verband.data.attributes.Ansprechpartner[i].Position,
          name: data.verband.data.attributes.Ansprechpartner[i].Vorname,
          surname: data.verband.data.attributes.Ansprechpartner[i].Nachname,
          email: data.verband.data.attributes.Ansprechpartner[i].Email,
          mobile: data.verband.data.attributes.Ansprechpartner[i].Handynummer,
          profilePicture: environment.strapiUrl + data.verband.data.attributes.Ansprechpartner[i].Profilbild.data?.attributes.url
        })
      }
      console.log(this.qualifiedPersonList);
    });
  }

}
