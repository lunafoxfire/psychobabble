import { TestBed, inject } from '@angular/core/testing';

import { VerifyGuardService } from './verify-guard.service';

describe('VerifyGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyGuardService]
    });
  });

  it('should be created', inject([VerifyGuardService], (service: VerifyGuardService) => {
    expect(service).toBeTruthy();
  }));
});
