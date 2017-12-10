
export class HandEvaluator {
  private ranks = {
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
  };

  private handNames = [
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
  ];

  public evaluate(hand) {
    const sortedSuits = this.getSortedSuits(hand.cards);
    const sortedRanks = this.getSortedRanks(hand.cards);
    const fiveCardHand = this.evaluateFiveCardHands(hand, sortedSuits, sortedRanks);
    if(!fiveCardHand) {
      const kickerHand = this.evaluateKickerHands(hand, sortedSuits, sortedRanks);
      return kickerHand;
    }
    return fiveCardHand;
  }

  private evaluateKickerHands(hand, suits, ranks) {
    const fourOfAKind = 2,
          threeOfAKind = 6,
          twoPair = 7,
          pair = 8,
          highCard = 9;
    let kickers;

    kickers = this.hasSameRankForRange(ranks, 4);
    if(kickers) {
      return this.getUpdatedHand(hand, this.handNames[fourOfAKind], kickers);
    }

    kickers = this.hasSameRankForRange(ranks, 3);
    if(kickers) {
      return this.getUpdatedHand(hand, this.handNames[threeOfAKind], kickers);
    }

    kickers = this.hasCombinationHand(ranks, 2, 2);
    if(kickers) {
      return this.getUpdatedHand(hand, this.handNames[twoPair], kickers);
    }

    kickers = this.hasSameRankForRange(ranks, 2);
    if(kickers) {
      return this.getUpdatedHand(hand, this.handNames[pair], kickers);
    }

    kickers = ranks.slice(0,4);
    return this.getUpdatedHand(hand, this.handNames[highCard], kickers);
  }

  private getUpdatedHand(hand, handName, kickers = null) {
    if(kickers) {
      hand.setKickers(kickers);
    }
    const highCardValue = this.getHighCardValue(hand);
    hand.setHighCardValue(highCardValue)
    hand.setHandName(handName);
    return hand;
  }

  private getHighCardValue(hand) {
    const cards = hand.getCards();
    const kickers = hand.getKickers();
    if(kickers) {
      const highs = cards
        .map((card) => this.getRankValue(card))
        .filter(card => kickers.indexOf(card))
        .sort((a, b)=> (a < b) ? 1: -1);
      return highs[0];
    }
    return false;
  }

  private evaluateFiveCardHands(hand, suits, ranks) {
    const royalFlush = 0,
          straightFlush = 1,
          fullHouse = 3,
          flush = 4,
          straight = 5;
    const aceValue = 'A';
    let handName;

    if (this.isSequence(hand.cards)){
      const aceRankValue = this.getRankValue(aceValue);
      if(this.hasHighCardOf(hand.cards, aceRankValue)) {
        handName = this.handNames[royalFlush]
      }
      else if(this.isSameSuit(suits)) {
        handName = this.handNames[straightFlush]
      }
      else {
        handName = this.handNames[straight];
      }
      return this.getUpdatedHand(hand, handName);
    }

    if(this.isSameSuit(suits)) {
      handName = this.handNames[flush];
      return this.getUpdatedHand(hand, handName);
    }

    if(this.hasCombinationHand(ranks, 3, 2)) {
        handName = this.handNames[fullHouse];
        return this.getUpdatedHand(hand, handName);
    }

    return false;
  }

  private getSortedSuits (cards) {
    const suits = cards.map(card => this.getSuitValue(card));
    return suits.sort((a,b)=> (a < b) ? -1 : 1);
  }

  private getSortedRanks (cards) {
    let ranks = cards.map(card => this.getRankValue(card));
    ranks = ranks.sort((a,b)=> (a < b) ? -1 : 1);
    return ranks;
  }

  private getRankValue(card) {
    if(card.length === 1) {
      return this.ranks[card];
    }
    const rankString = card.substr(0, card.length-1);
    const rank = this.ranks[rankString];
    return rank;
  }

  private getSuitValue(card) {
    return card[card.length-1].charCodeAt();
  }

  private isSameSuit(suits) {
    const suitsCancelOut = suits.reduce((suit, memo) => memo = suit ^ memo, 0);
    return !suitsCancelOut;
  }

  private isSameRank(ranks) {
    const ranksCancelOut = ranks.reduce(
      (rank, memo) => memo = rank.toString(2) ^ memo.toString(2),
    0);
    return !ranksCancelOut;
  }

  private hasSameSuitForRange(sortedSuits, range) {
    return this.hasSameValueForRange(sortedSuits, range, this.isSameSuit);
  }

  private hasSameRankForRange(sortedRanks, range) {
    return this.hasSameValueForRange(sortedRanks, range, this.isSameRank);
  }

  private hasSameValueForRange(sortedValues, range, callback) {
    const count = sortedValues
      .reduce((a, b) => Object.assign(a, {[b]: (a[b] || 0) + 1}), {});

    const getDuplicatesForRange = dict =>
      Object.keys(dict).filter((a) => dict[a] > 1 && range === dict[a]);
    const duplicates = getDuplicatesForRange(count);

    if(duplicates.length > 0) {
      const highCardValue = parseInt(duplicates[0]);
      const kickers = sortedValues.filter(val => val !== highCardValue);
      return kickers;
    }
    return false;
  }

  private isFullHouse(sortedRanks) {
    return this.hasCombinationHand(sortedRanks, 3, 2);
  }

  private isTwoPair(sortedRanks) {
    return this.hasCombinationHand(sortedRanks, 2, 2);
  }

  private hasCombinationHand(sortedRanks, firstRange, secondRange) {
    let remaining = this.hasSameRankForRange(sortedRanks, firstRange);
    return (remaining)
      ? this.hasSameRankForRange(remaining, secondRange)
      : false;
  }

  private isSequence(cards) {
    const sortedRanks = cards.map(card => this.getRankValue(card)).sort();
    const sortedRanksSum = sortedRanks.reduce((rank, memo) => memo = memo + rank, 0);
    const firstCardSum = sortedRanks[0] * sortedRanks.length;
    const isSequential = (Math.abs(sortedRanksSum - firstCardSum) === sortedRanks.length);
    return isSequential;
  }

  private hasHighCardOf(cards, highCardRank) {
    const ranks = cards.map(card => this.getRankValue(card));
    const highestRank = ranks.reduce((rank, memo) => memo = (rank > memo) ? rank : memo, 0);
    return highestRank === highCardRank;
  }

}
