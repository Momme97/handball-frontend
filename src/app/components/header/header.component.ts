import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRoute: string;
  mobileNavOpen: boolean = false;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    if(this.currentRoute === undefined){
      this.currentRoute = this.router.url;
    }

  }
  async routeChanged(location: string){
    this.mobileNavOpen = false;
    await this.router.navigate([location])
    this.currentRoute = this.router.url;
  }

}
