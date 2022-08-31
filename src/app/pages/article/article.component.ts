import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {ActivatedRoute, Router} from "@angular/router";
import moment from "moment/moment";
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('700ms', style({opacity:1})),
      ])
    ])
  ]
})
export class ArticleComponent implements OnInit {
  public env = environment;
  private currentArticleId: any;
  private articleCategory:any;
  public articleDate: any;
  articleObject: any;
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

                ...on ComponentArtikelbildArtikelbild{
                  Beschreibung
                  Bild{
                    data{
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
                ...on ComponentArtikelbildArtikelbild {
                  Beschreibung
                  Bild {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
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
                ...on ComponentArtikelbildArtikelbild {
                  Bild {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                },
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
                ...on ComponentArtikelbildArtikelbild {
                        Beschreibung
                        Bild {
                          data {
                            attributes {
                              url
                            }
                          }
                        }
                      }
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
                ...on ComponentArtikelbildArtikelbild {
                        Beschreibung
                        Bild {
                          data {
                            attributes {
                              url
                            }
                          }
                        }
                      }
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
