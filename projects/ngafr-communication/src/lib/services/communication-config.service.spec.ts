import { TestBed } from '@angular/core/testing';

import { CommunicationConfigService } from './communication-config.service';

describe('CommunicationConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunicationConfigService = TestBed.get(CommunicationConfigService);
    expect(service).toBeTruthy();
  });
});
