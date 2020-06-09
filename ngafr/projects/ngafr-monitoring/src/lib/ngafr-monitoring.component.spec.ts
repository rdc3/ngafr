import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgafrMonitoringComponent } from './ngafr-monitoring.component';

describe('NgafrMonitoringComponent', () => {
  let component: NgafrMonitoringComponent;
  let fixture: ComponentFixture<NgafrMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgafrMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgafrMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
