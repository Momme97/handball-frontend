import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            animate('1s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            animate('1s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ClubCardComponent implements OnInit {
  @Input() clubname: string;
  @Input() logoUrl: string;
  isHover: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeHoverState(state:boolean){
    this.isHover = state;
  }

}
