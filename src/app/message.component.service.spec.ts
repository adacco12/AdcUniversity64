import { TestBed } from '@angular/core/testing';

import { Message.ComponentService } from './message.component.service';

describe('Message.ComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Message.ComponentService = TestBed.get(Message.ComponentService);
    expect(service).toBeTruthy();
  });
});
