import { TestBed } from '@angular/core/testing';

import { DbmongoService } from './dbmongo.service';

describe('DbmongoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbmongoService = TestBed.get(DbmongoService);
    expect(service).toBeTruthy();
  });
});
