import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {ActivatedRoute, Router} from "@angular/router";
import moment, { Moment } from "moment/moment";
import {environment} from "../../../environments/environment";
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  public env = environment;
  private currentArticleId: any;
  private articleCategory:any;
  public articleDate: any;
  articleObject: any;
  contentItems: any[] = [];

  articleImageUrl: string;
  private querySubscription: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(parameter => {
    this.currentArticleId = parameter['id'];
    this.articleCategory = parameter['category']
    });

    let ACTIVE_QUERY: any;

    if(this.articleCategory === 'general'){
      ACTIVE_QUERY = gql `
      query{
        neuigkeitenImVerband(id:${this.currentArticleId}){
          data{
            id,
            attributes{
              Titel,
              createdAt,
              Author
              Artikelbild{
                data{
                  attributes{
                    url
                  }
                }
              }
              Contentarea{
                ...on ComponentRichtextblockRichTextBlock{
                  Text
                },
                ...on ComponentMatchContentMatchContent {
                  Spielklasse,
                  Spielort,
                  Anwurfzeit
                  Heimmannschaft,
                  HeimLogo {data{attributes{url}}}
                  Auswaertsmannschaft,
                  Auswaertslogo {data{attributes{url}}},
                  
                }


              }

            }
          }
        }
      }
    `;
    } else if(this.articleCategory === 'jugend'){
      ACTIVE_QUERY = gql `
      query{
        newsJugend(id:${this.currentArticleId}){
          data {
            attributes {
              Titel,
              Author,
              Artikelbild {
                data {
                  attributes {
                    url
                  }
                }
              }
              Contentarea {
                ...on ComponentRichtextblockRichTextBlock {
                  Text
                }
              }
            }
          }
        }
      }
    `;
    } else if(this.articleCategory === 'auswahlkader') {
      ACTIVE_QUERY = gql `
      query{
        newsAuswahlkader(id:${this.currentArticleId}){
          data {
            attributes {
              Titel,
              Artikelbild{
                data {
                  attributes {
                    url
                  }
                }
              }
              createdAt,
              Author,
              Contentarea {
                ...on ComponentRichtextblockRichTextBlock {
                  Text
                }
              }
            }
          }
        }
      }
    `;
    } else if(this.articleCategory === 'schiedsrichter') {
      ACTIVE_QUERY = gql `
      query{
        newsSchiedsrichter(id:${this.currentArticleId}) {
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
              },
              Author,
              createdAt,
              Contentarea {
                ...on ComponentRichtextblockRichTextBlock {
                  Text
                }
              }
            }
          }
        }
      }
    `;
    } else if(this.articleCategory === 'trainer') {
      ACTIVE_QUERY = gql `
      query{
        newsTrainer(id:${this.currentArticleId}) {
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
              },
              Author,
              createdAt,
              Contentarea {
                ...on ComponentRichtextblockRichTextBlock {
                  Text
                }
              }
            }
          }
        }
      }
      `;
    }


    this.querySubscription = this.apollo.watchQuery<any>({
      query: ACTIVE_QUERY
    }).valueChanges.subscribe(({ data, loading }) => {
      if(this.articleCategory === 'general'){
        for(let i = 0; i < data.neuigkeitenImVerband.data.attributes.Contentarea.length; i++){
          if(data.neuigkeitenImVerband.data.attributes.Contentarea[i].__typename === 'ComponentRichtextblockRichTextBlock'){
            this.contentItems.push({
              itemtype: 'Richtextblock',
              data: JSON.parse(data.neuigkeitenImVerband.data.attributes.Contentarea[i].Text)
            })
          }else if(data.neuigkeitenImVerband.data.attributes.Contentarea[i].__typename === 'ComponentMatchContentMatchContent'){
            this.contentItems.push({
              itemtype: 'MatchContent',
              data: data.neuigkeitenImVerband.data.attributes.Contentarea[i]
            })
          }
        }
        this.articleObject = data.neuigkeitenImVerband.data.attributes;
        this.articleImageUrl = environment.strapiUrl + data.neuigkeitenImVerband.data.attributes.Artikelbild.data.attributes.url;
        this.articleDate =  moment(data.neuigkeitenImVerband.data.attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss');
      }else if(this.articleCategory === 'jugend') {
        this.articleObject = data.newsJugend.data.attributes;
        this.articleImageUrl = environment.strapiUrl + data.newsJugend.data.attributes.Artikelbild.data.attributes.url;
        this.articleDate = moment(data.newsJugend.data.attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss');
      }else if(this.articleCategory === 'auswahlkader') {
        this.articleObject = data.newsAuswahlkader.data.attributes;
        this.articleImageUrl = environment.strapiUrl + data.newsAuswahlkader.data.attributes.Artikelbild.data.attributes.url;
        this.articleDate = moment(data.newsAuswahlkader.data.attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss');
      }else if(this.articleCategory === 'schiedsrichter') {
        this.articleObject = data.newsSchiedsrichter.data.attributes;
        this.articleImageUrl = environment.strapiUrl + data.newsSchiedsrichter.data.attributes.Artikelbild.data.attributes.url;
        this.articleDate = moment(data.newsSchiedsrichter.data.attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss');
      }else if(this.articleCategory === 'trainer') {
        this.articleObject = data.newsTrainer.data.attributes;
        this.articleImageUrl = environment.strapiUrl + data.newsTrainer.data.attributes.Artikelbild.data.attributes.url;
        this.articleDate = moment(data.newsTrainer.data.attributes.createdAt).lang("de").format('Do MMMM YYYY, hh:mm:ss');
      }
    });


  }

}
