import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommunicationConfig } from './../../../environments/ngafr.config';
import { NgafrCommunicationService } from 'ngafr-communication';

@Component({
  selector: 'ngafr-testapp-video-chat-demo',
  templateUrl: './video-chat-demo.component.html',
  styleUrls: ['./video-chat-demo.component.scss']
})
export class VideoChatDemoComponent implements AfterViewInit, OnDestroy {
  public connected = false;
  public user: any = { avatar: '' };
  public onlinePeers: any = [];
  constructor(
    private comm: NgafrCommunicationService
  ) { }

  ngAfterViewInit(): void {
    this.comm.onUserUpdate().subscribe(user => {
      if (!user) { return; }
      this.user = user;
      this.connect();
    });
  }

  connect(): void {
    if (CommunicationConfig.allowAudio || CommunicationConfig.allowVideo) {
      this.comm.connect().subscribe(connected => {
        this.connected = connected;
      });
      this.comm.onPeersOnline().subscribe(peers => {
        this.onlinePeers = peers;
      });
    } else {
      this.connected = !!(this.user);
    }
  }

  call(): void {
    this.comm.call();
  }

  ngOnDestroy(): void {
    this.comm.disconnect();
  }


}
