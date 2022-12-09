import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subpage-header',
  templateUrl: './subpage-header.component.html',
  styleUrls: ['./subpage-header.component.scss']
})
export class SubpageHeaderComponent implements OnInit {
  @Input() pageTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
