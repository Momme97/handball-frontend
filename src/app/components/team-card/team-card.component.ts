import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  public env = environment;
  @Input() teamName: string;
  @Input() trainer: string;
  @Input() teamImageUrl: string;
  @Input() trikotsList: any;



  constructor() { }

  ngOnInit(): void {
  }

}
