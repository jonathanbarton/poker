import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HandService } from '../hand.service';
import { Hand } from '../shared/hand';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.css']
})
export class PlayerHandComponent implements OnInit {
  @Input() playerName: string;
  @Input() numberOfCards: number;
  @Input() showFace: boolean = true;
  @Input() playerPhotoUrl: string;
  @Output() change: EventEmitter<Hand> = new EventEmitter<Hand>();

  private hand: Hand;
  constructor(private handService: HandService) {}

  ngOnInit() {
    this.hand = this.handService.drawHand(this.playerName, this.numberOfCards);
    this.change.emit(this.hand);
  }

  private getSuitString(card): string {
    const lastCardIndex = card.length-1;
    return card[lastCardIndex];
  }
  
  private getRankString(card): string {
    const lastCardIndex = card.length-1;
    const rank = card.substr(0,lastCardIndex);
    return rank;
  }

  private getCardOffsetClass(cardIndex) {
    return ['first', 'second', 'third', 'fourth', 'fifth'][cardIndex];
  }
}
