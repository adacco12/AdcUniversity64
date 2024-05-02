import { TestBed } from '@angular/core/testing';

import { MessageComponentService } from './message.component.service';

describe('Message.ComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageComponentService = TestBed.get(MessageComponentService);
    expect(service).toBeTruthy();
  });
});
