import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-featured-article-card',
  templateUrl: './featured-article-card.component.html',
  styleUrls: ['./featured-article-card.component.scss']
})
export class FeaturedArticleCardComponent implements OnInit {
  @Input() postId: string;
  @Input() title: string;
  @Input() author: string;
  @Input() createdAt: string;
  @Input() shortText: string;
  @Input() imageUrl: string;
  @Input() ctaText: string;
  @Input() type: string | undefined;
  displayCategory: string | undefined;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    switch(this.type) {
      case 'general':
        this.displayCategory = 'Allgemein';
        break;
      case 'jugend':
      this.displayCategory = 'Jugend';
        break;
      case 'auswahlkader':
        this.displayCategory = 'Auswahlkader';
        break;
      case 'schiedsrichter':
        this.displayCategory = 'Schiedsrichter';
        break;
    }
  }

  ctaClicked(){
    this.router.navigate(['/artikel', this.type , this.postId])
  }

}
