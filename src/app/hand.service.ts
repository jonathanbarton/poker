import { Injectable } from '@angular/core';

import { Hand } from './shared/hand';
import { HandEvaluator } from './shared/hand-evaluator';

@Injectable()
export class HandService {
  private static evaluator = new HandEvaluator();
  private config = {
    suits: [
      'S',
      'D',
      'C',
      'H'
    ],
    ranks: {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
    },
    handNames: [
      'Royal Flush',
      'Straight Flush',
      'Four of a Kind',
      'Full House',
      'Flush',
      'Straight',
      'Three of a Kind',
      'Two Pair',
      'Pair',
      'High Card'
    ]

  };

  private deck;
  private hands;

  constructor() {
    this.deck = this.getNewDeck();
    this.hands = [];
  }

  public drawHand(playerName, numberOfCards) {
    let cards = [];
    if(this.deck.length >= numberOfCards) {
      for(var i = 0; i < numberOfCards; i++) {
        cards.push(this.deck.pop());
      }
    } else {
      throw new Error('Not enough cards');
    }

    let newHand = new Hand(cards);
    newHand.setPlayerName(playerName);
    newHand = HandService.evaluator.evaluate(newHand);
    return newHand;
  }

  public getHands() {
    return this.hands;
  }

  private getNewDeck() {
     let cards = [];
     for (let suitIndex in this.config.suits) {
       for(let rank in this.config.ranks) {
         const suit = this.config.suits[suitIndex];
         cards.push(`${rank}${suit}`);
       }
     }
     return this.shuffleDeck(cards);
  }

  private shuffleDeck(cards) {
    const deckSize = cards.length;
    const shuffleCount = 3;
    for(var c = 0; c < shuffleCount; c++) {
      for(var i = 0; i < deckSize; i++) {
        const targetIndex = this.getRandomCardIndex(deckSize);
        const hold = cards[i];
        cards[i] = cards[targetIndex];
        cards[targetIndex] = hold;
      }
    }
    return cards;
  }

  private getRandomCardIndex(deckSize) {
    return Math.floor(Math.random() * deckSize);
  }

  public compareHands(hands) {
    hands = hands.sort((firstHand, secondHand) => {
      const firstHandSortValue = this.getHandSortValue(firstHand);
      const secondHandSortValue = this.getHandSortValue(secondHand);
      if(firstHandSortValue === secondHandSortValue) {
        const firstHandHighCardValue = firstHand.getHighCardValue();
        const secondHandHighCardValue = secondHand.getHighCardValue();
        if(firstHandHighCardValue !== secondHandHighCardValue) {
          return (firstHandHighCardValue < secondHandHighCardValue) ? 1 : -1;
        }

        const firstHandKickerSum = this.getKickerSum(firstHand);
        const secondHandKickerSum = this.getKickerSum(secondHand);
        if(firstHandKickerSum === secondHandKickerSum) {
          return 0;
        }
        return (firstHandKickerSum < secondHandKickerSum) ? 1 : -1;
      }
      return (firstHandSortValue < secondHandSortValue) ? -1 : 1;
    });
    console.log('sorted:', hands);
    return hands;
  }

  private getHandSortValue(hand) {
    const handName = hand.getHandName();
    return this.config.handNames.indexOf(handName);
  }


  private getKickerSum(hand) {
    const kickers = hand.getKickers();
    if(kickers) {
      return kickers.reduce((kicker, memo) => memo = memo + kicker, 0)
    }
    return 0;
  }
}
