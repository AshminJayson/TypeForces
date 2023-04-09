import { TestBed } from '@angular/core/testing';

import { StorygptService } from './storygpt.service';

describe('StorygptService', () => {
  let service: StorygptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorygptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
