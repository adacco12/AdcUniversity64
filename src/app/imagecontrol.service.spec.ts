import { TestBed } from '@angular/core/testing';

import { ImagecontrolService } from './imagecontrol.service';

describe('ImagecontrolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagecontrolService = TestBed.get(ImagecontrolService);
    expect(service).toBeTruthy();
  });
});
