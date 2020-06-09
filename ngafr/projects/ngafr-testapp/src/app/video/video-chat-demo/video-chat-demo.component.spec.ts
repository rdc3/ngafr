import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoChatDemoComponent } from './video-chat-demo.component';

describe('VideoChatDemoComponent', () => {
  let component: VideoChatDemoComponent;
  let fixture: ComponentFixture<VideoChatDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoChatDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoChatDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
