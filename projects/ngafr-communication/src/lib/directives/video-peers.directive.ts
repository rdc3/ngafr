import {
  Directive, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ChangeDetectorRef
} from '@angular/core';
import { ConnNotifierService } from '../services/conn-notifier.service';
import { VideoTemplateComponent } from '../templates/video/video-template.component';
import * as hark from 'hark';

@Directive({
  selector: '[ngafrVideoPeers]'
})
export class VideoPeersDirective implements OnInit {
  private componentRefs: any = [];

  constructor(
    private notifier: ConnNotifierService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.notifier.peerConnections$.subscribe(connections => {
      this.componentRefs.forEach(element => {
        element.markForDelete = true;
      });
      if (!connections) { return; }
      connections.forEach(conn => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoTemplateComponent);
        const element = this.componentRefs.filter(e => e.id === conn.metaData.offer.connectionId);
        let componentRef: ComponentRef<VideoTemplateComponent> = (element) ? element.componentRef : null;
        if (componentRef) {
          this.componentRefs.find(e => e.id === conn.metaData.offer.connectionId).markForDelete = false;
        } else {
          componentRef = componentFactory.create(this.viewContainer.injector);
          this.componentRefs.push({ id: conn.metaData.offer.connectionId, markForDelete: false, componentRef });
        }
        componentRef.instance.stream = conn.metaData.stream;
        const speechEvents = hark(conn.metaData.stream, { interval: 200, play: false });
        speechEvents.on('speaking', () => {
          componentRef.instance.speaking = true;
          this.cdr.detectChanges();
        });
        speechEvents.on('stopped_speaking', () => {
          componentRef.instance.speaking = false;
          this.cdr.detectChanges();
        });

        componentRef.instance.class = 'peerVideo';
        componentRef.instance.muted = false;
        componentRef.instance.volume = 0.9;
        conn.metaData.stream.getAudioTracks().forEach(track => {
          componentRef.instance.audioOn = track.enabled;
        });
        conn.metaData.stream.getTracks().forEach(track => {
          componentRef.instance.videoOn = track.enabled;
        });
        componentRef.instance.displayName = conn.metaData.offer.user.name;
        this.viewContainer.createEmbeddedView(componentRef.instance.videoTemplate);
      });
      this.componentRefs.filter(element => element.markForDelete).forEach(element => {
        (element.componentRef as ComponentRef<VideoTemplateComponent>).instance.connected = false;
        (element.componentRef as ComponentRef<VideoTemplateComponent>).instance.toggleAudio(false);
        (element.componentRef as ComponentRef<VideoTemplateComponent>).instance.toggleVideo(false);
      });
    });
  }

}
