import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { Gynasium } from 'src/app/data-models/gymnasium';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapService } from './map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() clubId: string;

  constructor(private map: MapService) { }


  ngOnInit() {
    this.map.buildMap(this.clubId)

  }
  





  
  


}
