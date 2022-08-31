import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit {

  constructor(
    private location: Location  ) { }

  ngOnInit(): void {
  }

  navigateBack(){
    this.location.back();
  }
}
