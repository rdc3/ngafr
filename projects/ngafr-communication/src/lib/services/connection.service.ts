import { Injectable, Inject } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DbService } from './db.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { IMessage, IUserOnline, IConnection, IOfferRequest, ICommunicationConfig } from '../models/models';
import { ConnNotifierService } from './conn-notifier.service';
import { MediaService } from './media.service';
import { CommunicationConfigData } from '../models/config';

declare let RTCPeerConnection: any;

@Injectable()
export class ConnectionService {

  private connections: IConnection[] = [];
  private me: any = {};
  private bandwidthLimit;
  private iceServersConfig: any;
  private allowAudio: boolean;
  private allowVideo: boolean;
  private subscriptions: Subscription[] = [];
  constructor(
    private dbService: DbService,
    private dataService: DataService,
    private auth: AuthService,
    private notifier: ConnNotifierService,
    private vidService: MediaService,
    @Inject(CommunicationConfigData) private commConfig: ICommunicationConfig
  ) {
    console.log('myConnectionId:', this.auth.myConnectionId);
    this.allowAudio = commConfig.allowAudio;
    this.allowVideo = commConfig.allowVideo;
    this.iceServersConfig = commConfig.iceServersConfig;
    this.bandwidthLimit = commConfig.bandwidthLimit;
  }
  private initSubscriptions(): void {
    this.subscriptions.push(
      this.dbService.onCommunicationUpdate().subscribe((data) => { this.dataService.readMessage(data); },
        (err) => {
          this.notifier.localStream$.next(null);
          this.notifier.peerConnections$.next([]);
          console.log('connection dropped');
        })
    );
    this.subscriptions.push(
      this.notifier.user$.subscribe(me => {
        if (!me) { return; }
        this.me = me;
      })
    );
    this.subscriptions.push(
      this.notifier.handShakeReceived$.subscribe(message => { this.handShakeReceived(message); })
    );
    this.subscriptions.push(
      this.notifier.iceServerReceived$.subscribe(message => { this.iceServerReceived(message); })
    );
    this.subscriptions.push(
      this.notifier.sdpReceived$.subscribe(message => { this.sdpReceived(message); })
    );
    this.subscriptions.push(
      this.notifier.iceServerReceived$.subscribe(message => { this.iceServerReceived(message); })
    );
  }
  private unsubscribeAll(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handShakeReceived(message: IMessage): void {
    this.createNewPeerConnection(message.from);
    if (message.msg.handshake.type === 'offer') {
      this.sendMessage(message.from.connectionId, JSON.stringify({
        handshake: { type: 'answer', user: { id: this.me.id, name: this.me.name } }
      }));
    }
    if (message.msg.handshake.type === 'answer') {
      this.createOfferForPeer(message.from);
    }
  }

  private iceServerReceived(message: IMessage): void {
    this.connections[message.from.connectionId].addIceCandidate(new RTCIceCandidate(message.msg.iceservers))
      .catch(e => console.warn('Exception: addIceCandidate - ', e));
  }

  private sdpReceived(message: IMessage): void {
    const fromId = message.from.connectionId;
    const conn = this.connections[fromId];
    const msg = message.msg.sdp;
    if (msg.type === 'offer') {
      // if(connections[Message.from].signalingState == 'stable') return;
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

  private broadcast(data: string): void {
    this.sendMessage('All', data);
  }

  private sendMessage(receiverId: any, data: string): void {
    this.dbService.sendCommunication({
      from: { connectionId: this.auth.myConnectionId, user: this.me }, to: receiverId.toString(), msg: data
    });
  }

  private createOfferForPeer(offerReq: IOfferRequest): void {
    const peerId = offerReq.connectionId;
    const offerOptions = {
      offerToReceiveAudio: this.allowAudio,
      offerToReceiveVideo: this.allowVideo
    };
    if (this.connections[peerId]) {
      this.connections[peerId].createOffer(offerOptions)
        .then(offer => {
          offer.sdp = this.dataService.setMediaBitrates(offer.sdp, this.bandwidthLimit);
          return this.connections[peerId].setLocalDescription(offer);
        })
        .then(() => this.sendMessage(peerId, JSON.stringify({ sdp: this.connections[peerId].localDescription })))
        .catch(e => console.warn('Exception: createOfferForPeer - ', offerReq.user.name, e));
    }
  }

  private createNewPeerConnection(offerReq: IOfferRequest): void {
    const peerId = offerReq.connectionId;
    if (!this.connections[peerId]) {
      this.connections[peerId] = new RTCPeerConnection(this.iceServersConfig);
      this.connections[peerId].metaData = { offer: { connectionId: peerId, user: offerReq.user } };
      // this.connections[peerId].metaData.offer.user = peer.user;
      this.connections[peerId].metaData.offer.connectionId = peerId;

      // Wait for their ice candidate
      this.connections[peerId].onicecandidate = (event) => {
        event.candidate ? this.sendMessage(peerId, JSON.stringify({ iceservers: event.candidate }))
          : console.log('Sent All Ice');
      };
      // Wait for their video stream
      this.connections[peerId].onaddstream = (event) => {
        this.gotRemoteStream(event.stream, peerId.toString());
      };
      this.notifier.localStream$.value.getTracks().forEach(track => {
        this.connections[peerId].addTrack(track, this.notifier.localStream$.value);
      });
    }
  }

  private gotRemoteStream(stream: MediaStream, peerId: string): void {
    this.connections[peerId].metaData.stream = stream;
    this.notifier.peerConnections$.next([...this.notifier.peerConnections$.value, this.connections[peerId]]);
  }

  onPeersOnline(): Observable<IUserOnline[]> {
    return this.dbService.onUserStatusChange().pipe(map(data => {
      const onlinePeers = this.notifier.peerConnections$.value.filter(peer => peer.metaData.state === 'online');
      if (onlinePeers.length !== this.notifier.peerConnections$.value.length) {
        this.notifier.peerConnections$.next(onlinePeers);
      }
      return data.filter(peer => peer.connectionId !== this.auth.myConnectionId && peer.connectionState === 'online');
    }), catchError(
     err => {
         console.log('Coul not fetch the peers online status');
         return of(err);
     })
    );
  }
  onPeersJoinedCall(): Observable<any> {
    return this.notifier.peerConnections$;
  }

  connect(): Observable<MediaStream> {
    this.initSubscriptions();
    this.vidService.startCamera();
    return this.notifier.localStream$;
  }

  disconnect(): void {
    this.auth.setUserOfflineStatus();
    this.notifier.peerConnections$.value.forEach(peer => peer.close());
    this.notifier.peerConnections$.next([]);
    this.notifier.localStream$.next(null);
    this.unsubscribeAll();
  }

  call(): void {
    console.log('calling');
    this.broadcast(JSON.stringify({ handshake: { type: 'offer', user: this.notifier.user$.value } }));
  }
}
