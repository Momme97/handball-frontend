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
  @Input() shortText: string;
  @Input() imageUrl: string;
  @Input() ctaText: string;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  ctaClicked(){
    this.router.navigate(['/artikel', 'general' , this.postId])
  }

}
