import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sponsor-header',
  templateUrl: './sponsor-header.component.html',
  styleUrls: ['./sponsor-header.component.scss']
})
export class SponsorHeaderComponent implements OnInit {

  constructor(
    private location: Location,

  ) { }

  ngOnInit(): void {
  }

  navigateBack(){
    this.location.back();
  }
}
