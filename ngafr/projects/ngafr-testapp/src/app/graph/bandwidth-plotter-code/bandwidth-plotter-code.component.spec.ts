import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthPlotterCodeComponent } from './bandwidth-plotter-code.component';

describe('BandwidthPlotterCodeComponent', () => {
  let component: BandwidthPlotterCodeComponent;
  let fixture: ComponentFixture<BandwidthPlotterCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthPlotterCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthPlotterCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
