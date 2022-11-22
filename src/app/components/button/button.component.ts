import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonTitle: string;
  @Input() buttonStyle: string;
  @Input() leagueId?: number;
  @Output() sendClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked() {
    this.sendClick.emit({leagueId: this.leagueId});
  }

}
