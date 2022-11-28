import {Component, Input, OnInit} from '@angular/core';
import { Trikot } from 'src/app/data-models/staffeln';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  public env = environment;
  expanded = false;
  @Input() teamName: string;
  @Input() trainer: string | undefined;
  @Input() teamImageUrl: string | undefined;
  @Input() trikotsList: Trikot[] | undefined;



  constructor() { }

  ngOnInit(): void {
  }

  expandItem(){
    this.expanded = !this.expanded;
  }

}
