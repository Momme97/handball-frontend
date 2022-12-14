import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { environment } from 'src/environments/environment';

const GET_DOWNLOAD_ITEMS = gql `
  query{
    schiedsrichterDownload {
      data {
        attributes {
          Dateiliste {
            ...on ComponentSingleFileItemSingeFileItem {
              Filename,
              File {
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
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  private querySubscription: Subscription;
  fileList: any[] = [];
  strapiUrl: string = environment.strapiUrl

  constructor(
    private apollo: Apollo,

  ) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_DOWNLOAD_ITEMS
    }).valueChanges.subscribe(({ data, loading }) => {
      this.fileList = data.schiedsrichterDownload.data.attributes.Dateiliste;
      console.log(data.schiedsrichterDownload.data.attributes.Dateiliste)
    });
  }

}
