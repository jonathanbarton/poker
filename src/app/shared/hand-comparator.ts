export class HandComparator {
  private config;

  constructor(config) {
    this.config = config;
  }

  public evaluateGame(hands) {
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

    hands = hands.map((hand, handIndex) => {
      const rankNumber = handIndex + 1;
      hand.setPlayerRanking(rankNumber);
    });

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
