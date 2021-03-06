import {
  Component,
  Input,
  TemplateRef,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'ngafr-video-template',
  templateUrl: './video-template.component.html',
  styleUrls: ['./video-template.component.scss']
})
export class VideoTemplateComponent implements AfterViewInit {
  @ViewChild('videotemplate', { static: true }) videoTemplate: TemplateRef<any>;
  @ViewChild('videoEle', { read: ElementRef, static: false }) videoEle: ElementRef<any>;
  @Input() displayName = '';
  @Input() stream: MediaStream;
  @Input() class: string;
  @Input() volume: number;
  @Input() muted: boolean;
  @Input() speaking = false;
  public audioOn = true;
  public videoOn = true;
  public connected = true;
  constructor(
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef) { }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.elRef.nativeElement);
    this.cdr.detectChanges();
  }
  destroy(): void {
    this.cdr.detectChanges();
    if (!this.videoEle) {
        return;
    }
    (this.videoEle.nativeElement.srcObject as MediaStream).getTracks().forEach(track => {
      if (track.readyState === 'live') {
          track.stop();
      }
  });
  }

  toggleAudio = (unMute: boolean) => {
    this.cdr.detectChanges();
    if (!this.videoEle) {
        return;
    }
    (this.videoEle.nativeElement.srcObject as MediaStream).getAudioTracks().forEach(track => {
      track.enabled = unMute;
      this.audioOn = unMute;
    });
  }
  toggleVideo = (unMute: boolean) => {
    this.cdr.detectChanges();
    if (!this.videoEle) {
        return;
    }
    (this.videoEle.nativeElement.srcObject as MediaStream).getVideoTracks().forEach(track => {
      track.enabled = unMute;
      this.videoOn = unMute;
    });
  }


}
