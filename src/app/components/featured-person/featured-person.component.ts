import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-person',
  templateUrl: './featured-person.component.html',
  styleUrls: ['./featured-person.component.scss']
})
export class FeaturedPersonComponent implements OnInit {
  @Input() imageUrl?: string | undefined | null;
  @Input() name?:  string | undefined;
  @Input() surname?:  string | undefined;
  @Input() email?:  string | undefined;
  @Input() mobilePhone?:  string | undefined;
  @Input() summary?:  string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
