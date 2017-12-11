import { TestBed, inject } from '@angular/core/testing';
import { Hand } from './shared/hand';
import { HandService } from './hand.service';

describe('HandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandService]
    });
  });

  it('should draw hands from a deck of 52 cards', inject([HandService], (service: HandService) => {
    const hand = service.drawHand('foo', 5);
    expect(hand.getPlayerName()).toEqual('foo');
    expect(hand.getCards().length).toEqual(5);
  }));
});
