import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authType:string;
  public waitingForEmailCode: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(parameter => {
      this.authType = parameter['authType'];
    });
    console.log(this.authType)
  }

}
