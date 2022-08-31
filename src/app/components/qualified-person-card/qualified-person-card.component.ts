import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qualified-person-card',
  templateUrl: './qualified-person-card.component.html',
  styleUrls: ['./qualified-person-card.component.scss'],
})
export class QualifiedPersonCardComponent implements OnInit {
  @Input() titel: string;
  @Input() imageUrl: string;
  @Input() name: string;
  @Input() surname: string;
  @Input() email: string;
  @Input() mobilePhone: string;


  constructor() { }

  ngOnInit(): void {
  }

}
