import { TestBed, inject } from '@angular/core/testing';

import { HandService } from './hand.service';

describe('HandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandService]
    });
  });

  it('should ...', inject([HandService], (service: HandService) => {
    expect(service).toBeTruthy();
  }));
});
