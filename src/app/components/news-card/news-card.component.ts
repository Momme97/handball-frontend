import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() dateString: string;
  @Input() titel: string
  @Input() type: string | undefined;
  displayCategory: string | undefined;
  constructor() { }

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

}
