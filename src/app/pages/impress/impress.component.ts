import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const GET_IMPRESS = gql `
  query{
  impressum {
    data {
      attributes {
        Titel,
        Content
      }
    }
  }
}
`;

@Component({
  selector: 'app-impress',
  templateUrl: './impress.component.html',
  styleUrls: ['./impress.component.scss']
})
export class ImpressComponent implements OnInit {
  private querySubscription: Subscription;
  impressObject! : any;
  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_IMPRESS
    }).valueChanges.subscribe(({ data, loading }) => {
      this.impressObject = data;
      console.log(data);
    });
  }

}
