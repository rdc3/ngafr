import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoChatCodeComponent } from './video-chat-code.component';

describe('VideoChatCodeComponent', () => {
  let component: VideoChatCodeComponent;
  let fixture: ComponentFixture<VideoChatCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoChatCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoChatCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
