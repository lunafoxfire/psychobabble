import { TestBed, inject } from '@angular/core/testing';

import { TimedRedirectService } from './timed-redirect.service';

describe('TimedRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimedRedirectService]
    });
  });

  it('should be created', inject([TimedRedirectService], (service: TimedRedirectService) => {
    expect(service).toBeTruthy();
  }));
});
