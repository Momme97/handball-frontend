import { Injectable } from '@angular/core';

interface GameData{
  homeTeam: string,
  guestTeam: string,

}


@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {

  private GameData:GameData;


  setGameData(gameObject: GameData){
    this.GameData = gameObject;
  }

  getGameData(){
    return this.GameData;
  }







}
