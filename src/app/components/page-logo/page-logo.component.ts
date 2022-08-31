import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-logo',
  templateUrl: './page-logo.component.html',
  styleUrls: ['./page-logo.component.scss']
})
export class PageLogoComponent implements OnInit {
  @Input() isSmall:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
