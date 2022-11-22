import { Component, OnInit } from '@angular/core';
import {GameDetailsService} from "../../global-services/game-details.service";
@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
  public GameData: any;

  constructor(
    private gameDetailService: GameDetailsService
  ) { }

  ngOnInit(): void {
    this.GameData = this.gameDetailService.getGameData();
    console.log(this.GameData)

  }

}
