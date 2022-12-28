import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qualified-person-card',
  templateUrl: './qualified-person-card.component.html',
  styleUrls: ['./qualified-person-card.component.scss'],
})
export class QualifiedPersonCardComponent implements OnInit {
  @Input() titel?: string;
  @Input() imageUrl?: string | undefined | null;
  @Input() name?:  string | undefined;
  @Input() surname?:  string | undefined;
  @Input() email?:  string | undefined;
  @Input() mobilePhone?:  string | undefined;

  public env = environment;

  constructor() { }

  ngOnInit(): void {
    
  }


}
