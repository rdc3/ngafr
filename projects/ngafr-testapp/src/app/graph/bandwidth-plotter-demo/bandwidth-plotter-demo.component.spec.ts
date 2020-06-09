import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthPlotterDemoComponent } from './bandwidth-plotter-demo.component';

describe('BandwidthPlotterDemoComponent', () => {
  let component: BandwidthPlotterDemoComponent;
  let fixture: ComponentFixture<BandwidthPlotterDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthPlotterDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthPlotterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
