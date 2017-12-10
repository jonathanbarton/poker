import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {
  private players = [
    { name: 'Jonathan' },
    { name: 'Stephen' },
    { name: 'Billy' }
  ];

  private playerHands = {};

  constructor() { }

  public getPlayers() {
    return this.players;
  }

  public updatePlayerHand(hand) {
    const playerName = hand.getPlayerName();
    if(playerName) {
      this.playerHands[playerName] = hand;
    }
  }

  public getPlayerHands() {
    let hands = [];
    for(let playerName in this.playerHands) {
      hands.push(this.playerHands[playerName]);
    }
    return hands;
  }
}
