import {
  Directive, OnInit, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, ElementRef
} from '@angular/core';
import { ConnNotifierService } from '../services/conn-notifier.service';
import { VideoTemplateComponent } from '../templates/video/video-template.component';

@Directive({
  selector: '[ngafrVideoSelf]'
})
export class VideoSelfDirective implements OnInit {
  private vidTemplateComponent: VideoTemplateComponent;

  constructor(
    private notifier: ConnNotifierService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoTemplateComponent);
    const componentRef = componentFactory.create(this.viewContainer.injector);
    this.vidTemplateComponent = componentRef.instance;

    this.notifier.localStream$.subscribe(stream => {
      if (!stream) {
        this.viewContainer.clear();
        return;
      }
      this.vidTemplateComponent.stream = stream;
      stream.getAudioTracks().forEach(track => {
        this.vidTemplateComponent.audioOn = track.enabled;
      });
      stream.getTracks().forEach(track => {
        this.vidTemplateComponent.videoOn = track.enabled;
      });
      this.vidTemplateComponent.displayName = this.notifier.user$.value.name;
      this.vidTemplateComponent.class = 'localVideo';
      this.vidTemplateComponent.muted = true;          // To remove echo & feedback
      this.vidTemplateComponent.volume = 0;            // To remove echo & feedback
      this.viewContainer.createEmbeddedView(this.vidTemplateComponent.videoTemplate);
      this.cdr.markForCheck();
    });
  }

}
