export class Hand {
  private cards;
  private handName;
  private playerName;
  private kickers;

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

  public getCards() {
    return this.cards;
  }

}