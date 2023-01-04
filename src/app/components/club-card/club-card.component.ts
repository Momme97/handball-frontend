import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.scss'],

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
