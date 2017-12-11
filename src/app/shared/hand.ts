export class Hand {
  private cards;
  private handName;
  private playerName;
  private playerRanking;
  private kickers;
  private highCardValue;

  constructor(cards) {
    this.cards = cards;
  }

  public setPlayerName(name) {
    this.playerName = name;
  }

  public getPlayerName() {
    return this.playerName;
  }

  public setHandName(handName) {
    this.handName = handName;
  }

  public getHandName() {
    return this.handName;
  }

  public setKickers(kickers) {
    this.kickers = kickers;
  }

  public getKickers() {
    return this.kickers;
  }

  public setHighCardValue(cardValue) {
    this.highCardValue = cardValue;
  }

  public getHighCardValue() {
    return this.highCardValue;
  }

  public getCards() {
    return this.cards;
  }

  public setCards(cards) {
    this.cards = cards;
  }

  public getPlayerRanking() {
    return this.playerRanking;
  }

  public setPlayerRanking(rankNumber) {
    this.playerRanking = rankNumber;
  }


}
