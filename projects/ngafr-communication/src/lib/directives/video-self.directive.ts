import {
  Directive,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ChangeDetectorRef,
  ComponentRef,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { ConnNotifierService } from '../services/conn-notifier.service';
import { VideoTemplateComponent } from '../templates/video/video-template.component';

@Directive({
  selector: '[ngafrVideoSelf]'
})
export class VideoSelfDirective implements OnInit, AfterViewInit{
  private vidTemplateComponent: VideoTemplateComponent;

  constructor(
    private notifier: ConnNotifierService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef
  ) { }
  ngAfterViewInit(): void {
    this.notifier.localStream$.subscribe(stream => {
      if (!stream) {
        console.log('this.elRef.nativeElement', this.elRef.nativeElement);
        this.vidTemplateComponent.destroy();
        // this.viewContainer.clear();
        return;
      }
    });
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VideoTemplateComponent);
    const componentRef = componentFactory.create(this.viewContainer.injector);
    this.vidTemplateComponent = componentRef.instance;
    this.notifier.localStream$.subscribe(stream => {
      if (!stream) {
        // this.vidTemplateComponent.destroy();
        // this.viewContainer.clear();
        return;
      }
      this.cdr.markForCheck();
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
      console.log('this.elRef.nativeElement3', this.elRef.nativeElement);
    });
  }

}
