import { TestBed } from '@angular/core/testing';

import { PagedMongoService } from './paged-mongo.service';

describe('PagedMongoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagedMongoService = TestBed.get(PagedMongoService);
    expect(service).toBeTruthy();
  });
});
