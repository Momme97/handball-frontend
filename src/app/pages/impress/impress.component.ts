import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { MixpanelService } from 'src/app/global-services/mixpanel.service';

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
    private mixpanelService: MixpanelService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    /* --------------------------------------------
      Track page visted with mixpanel service
    -------------------------------------------- */
    this.mixpanelService.init();
    this.mixpanelService.track('Pagevisited',{
      location: this.router.url
    });
    
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_IMPRESS
    }).valueChanges.subscribe(({ data, loading }) => {
      this.impressObject = data;
      console.log(data);
    });
  }

}
