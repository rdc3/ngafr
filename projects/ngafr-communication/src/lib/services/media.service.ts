import { Injectable, Inject } from '@angular/core';
import { ConnNotifierService } from './conn-notifier.service';
import { ICommunicationConfig } from '../models/models';
import { CommunicationConfigData } from './communication-config.service';

@Injectable()
export class MediaService {
  private allowAudio: boolean;
  private allowVideo: boolean;

  constructor(
    private notifier: ConnNotifierService,
    @Inject(CommunicationConfigData) private commConfig: ICommunicationConfig
  ) {
    this.allowAudio = commConfig.allowAudio;
    this.allowVideo = commConfig.allowVideo;
  }

  startCamera() {
    if (this.allowAudio || this.allowVideo) {
      const video: any = (!this.allowVideo) ? false : this.commConfig.video;
      const constraints: MediaStreamConstraints = {
        audio: this.allowAudio,
        video
      };
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            this.notifier.localStream$.next(stream);
          })
          .catch(e => {
            console.warn('Media devices error...', e);
            this.notifier.localStream$.next(null);
          });
      } else {
        console.warn('media devices not found');
      }
    } else {
      this.notifier.localStream$.next(null);
    }
  }
}
