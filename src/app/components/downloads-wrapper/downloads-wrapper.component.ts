import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-downloads-wrapper',
  templateUrl: './downloads-wrapper.component.html',
  styleUrls: ['./downloads-wrapper.component.scss']
})
export class DownloadsWrapperComponent implements OnInit, AfterViewInit {
  strapiUrl: string = environment.strapiUrl

  @Input() fileList: any[];

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    
  }

}
