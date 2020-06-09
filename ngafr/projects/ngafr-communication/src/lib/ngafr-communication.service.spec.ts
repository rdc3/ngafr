import { TestBed } from '@angular/core/testing';

import { NgafrCommunicationService } from './ngafr-communication.service';

describe('NgafrCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgafrCommunicationService = TestBed.get(NgafrCommunicationService);
    expect(service).toBeTruthy();
  });
});
