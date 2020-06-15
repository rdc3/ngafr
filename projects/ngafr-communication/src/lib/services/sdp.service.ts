import { Injectable, Inject } from '@angular/core';
import { ICommunicationConfig, IMessage, IConnection, IOfferRequest } from '../models/models';
import { CommunicationConfigData } from './communication-config.service';
import { DataService } from './data.service';
import { DbService } from './firebase-db.service';
import { AuthService } from './auth.service';
import { ConnNotifierService } from './conn-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class SdpService {
  private bandwidthLimit;
  private allowAudio: boolean;
  private allowVideo: boolean;

  constructor(
    private dataService: DataService,
    private dbService: DbService,
    private auth: AuthService,
    private notifier: ConnNotifierService,
    @Inject(CommunicationConfigData) private commConfig: ICommunicationConfig
  ) {
    this.bandwidthLimit = commConfig.bandwidthLimit;
    this.allowAudio = commConfig.allowAudio;
    this.allowVideo = commConfig.allowVideo;
  }

  public sdpReceived(message: IMessage, conn: IConnection): void {
    const fromId = message.from.connectionId;
    const msg = message.msg.sdp;
    if (msg.type === 'offer') {
      msg.sdp = this.dataService.setMediaBitrates(msg.sdp, this.bandwidthLimit);
      conn.setRemoteDescription(new RTCSessionDescription(msg))
        .then(() => conn.createAnswer())
        .then(answer => {
          answer.sdp = this.dataService.setMediaBitrates(answer.sdp, this.bandwidthLimit);
          return conn.setLocalDescription(answer);
        })
        .then(() => this.sendMessage(fromId, JSON.stringify({ sdp: conn.localDescription })))
        .catch(e => console.warn('Exception: msg.type: offer - ', e));
    } else if (msg.type === 'answer') {
      if (conn.signalingState === 'stable') { return; }
      msg.sdp = this.dataService.setMediaBitrates(msg.sdp, this.bandwidthLimit);
      conn.setRemoteDescription(new RTCSessionDescription(msg))
        .catch(e => console.warn('Exception: msg.type: answer - ', e));
    }
  }
  public createOffer(offerReq: IOfferRequest, conn: IConnection) {
    const peerId = offerReq.connectionId;
    const offerOptions = {
      offerToReceiveAudio: this.allowAudio,
      offerToReceiveVideo: this.allowVideo,
      IceRestart: false
    };
    if (conn) {
      conn.createOffer(offerOptions)
        .then(offer => {
          offer.sdp = this.dataService.setMediaBitrates(offer.sdp, this.bandwidthLimit);
          return conn.setLocalDescription(offer);
        })
        .then(() => this.sendMessage(peerId, JSON.stringify({ sdp: conn.localDescription })))
        .catch(e => console.warn('Exception: createOfferForPeer - ', offerReq.user.name, e));
    }
  }
  public iceServerReceived(message: IMessage, conn: IConnection): void {
    conn.addIceCandidate(new RTCIceCandidate(message.msg.iceservers))
      .catch(e => console.warn('Exception: addIceCandidate - ', e));
  }

  // TODO: duplicate from conn service - need to move this out
  private sendMessage(receiverId: any, data: string): void {
    this.dbService.sendCommunication({
      from: { connectionId: this.auth.myConnectionId, user: this.notifier.user$.value }, to: receiverId.toString(), msg: data
    });
  }
}
