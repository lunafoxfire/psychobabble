import { TestBed, inject } from '@angular/core/testing';

import { ResponseGuardService } from './response-guard.service';

describe('ResponseGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseGuardService]
    });
  });

  it('should be created', inject([ResponseGuardService], (service: ResponseGuardService) => {
    expect(service).toBeTruthy();
  }));
});
