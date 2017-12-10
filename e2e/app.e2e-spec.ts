import { PokerPage } from './app.po';

describe('poker App', () => {
  let page: PokerPage;

  beforeEach(() => {
    page = new PokerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
