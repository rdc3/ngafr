import { TestBed } from '@angular/core/testing';

import { NgafrMonitoringService } from './ngafr-monitoring.service';

describe('NgafrMonitoringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgafrMonitoringService = TestBed.get(NgafrMonitoringService);
    expect(service).toBeTruthy();
  });
});
