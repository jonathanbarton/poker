import { Component } from '@angular/core';
import { HandService } from './hand.service';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private players = this.playerService.getPlayers();
  private showHands = false;
  constructor(
    private handService: HandService,
    private playerService: PlayerService
  ) {}

  private dealAgain() {
    window.location.reload();
  }

  private updatePlayerHand(hand) {
    this.playerService.updatePlayerHand(hand);
  }

  private compareHands() {
    this.showHands = true;
    const hands = this.playerService.getPlayerHands();
    const handRankings = this.handService.compareHands(hands);
    
  }

}
