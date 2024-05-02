import { TestBed } from '@angular/core/testing';

import { NgService } from './ng.service';

describe('NgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgService = TestBed.get(NgService);
    expect(service).toBeTruthy();
  });
});
