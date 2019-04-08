import { TestBed } from '@angular/core/testing';

import { DeklService } from './dekl.service';

describe('DeklService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeklService = TestBed.get(DeklService);
    expect(service).toBeTruthy();
  });
});
