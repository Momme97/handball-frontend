import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Gynasium } from 'src/app/data-models/gymnasium';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';


@Injectable({ providedIn: 'root' })
export class MapService {
  private querySubscription: Subscription;

  map: mapboxgl.Map;
  gynasiumMarker: mapboxgl.Marker;
  style = 'mapbox://styles/pressewart/clayioq8a001014o043182atv';
  zoom = 11;
  constructor(    private apollo: Apollo    ) {
  }

  

  buildMap(clubId: string) {

    

    const GET_GYMNASIUMLIST = gql `
    query{
      vereine(id:${clubId}) {
        data {
          id,
          attributes {
            Sporthallen {
              ...on ComponentSporthalleSporthalle {
                Name,
                Lat,
                Long,
                Bild {
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

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_GYMNASIUMLIST
    }).valueChanges.subscribe(({ data, loading }) => {

      this.map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: [data.vereine.data.attributes.Sporthallen[0].Long, data.vereine.data.attributes.Sporthallen[0].Lat],
      });
      
      //Fill Gymnasium List
      for(let i = 0; i < data.vereine.data.attributes.Sporthallen.length; i++){
        console.log(data.vereine.data.attributes.Sporthallen[i]);
        const el = document.createElement('div');
        const width = 30
        const height = 30
        el.className = 'marker';
        el.style.backgroundImage = `url(/assets/icons/football.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `
          <h3>${data.vereine.data.attributes.Sporthallen[i].Name}</h3>
          <img src="${environment.strapiUrl + data.vereine.data.attributes.Sporthallen[i].Bild.data.attributes.url}" />
          `
        );

        this.gynasiumMarker = new mapboxgl.Marker(el)
        .setLngLat([data.vereine.data.attributes.Sporthallen[i].Long, data.vereine.data.attributes.Sporthallen[i].Lat])
        .setPopup(popup)
        .addTo(this.map);
      }
    });
  }
}
