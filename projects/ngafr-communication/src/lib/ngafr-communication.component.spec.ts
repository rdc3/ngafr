import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgafrCommunicationComponent } from './ngafr-communication.component';

describe('NgafrCommunicationComponent', () => {
  let component: NgafrCommunicationComponent;
  let fixture: ComponentFixture<NgafrCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgafrCommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgafrCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
