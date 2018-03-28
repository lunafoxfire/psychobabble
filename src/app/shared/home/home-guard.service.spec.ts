import { TestBed, inject } from '@angular/core/testing';

import { HomeGuardService } from './home-guard.service';

describe('HomeGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeGuardService]
    });
  });

  it('should be created', inject([HomeGuardService], (service: HomeGuardService) => {
    expect(service).toBeTruthy();
  }));
});
