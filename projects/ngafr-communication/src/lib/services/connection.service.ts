import { Injectable, Inject } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DbService } from './firebase-db.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { IMessage, IUserOnline, IConnection, IOfferRequest, ICommunicationConfig } from '../models/models';
import { ConnNotifierService } from './conn-notifier.service';
import { MediaService } from './media.service';
import { SdpService } from './sdp.service';
import { CommunicationConfigData } from './communication-config.service';

declare let RTCPeerConnection: any;

@Injectable()
export class ConnectionService {

  private connections: IConnection[] = [];
  private me: any = {};
  private iceServersConfig: any;
  private subscriptions: Subscription[] = [];
  constructor(
    private dbService: DbService,
    private dataService: DataService,
    private auth: AuthService,
    private notifier: ConnNotifierService,
    private vidService: MediaService,
    private sdpService: SdpService,
    @Inject(CommunicationConfigData) private commConfig: ICommunicationConfig
  ) {
    this.iceServersConfig = commConfig.iceServersConfig;
  }

  onPeersOnline(): Observable<IUserOnline[]> {
    return this.dbService.onUserStatusChange().pipe(map(data => {
      const onlinePeers = this.notifier.peerConnections$.value.filter(peer => {
        return (peer.metaData.state === 'online' && peer.metaData.peer.id !== this.me.id);
      });
      const offlinePeers = this.notifier.peerConnections$.value.filter(peer => peer.metaData.state !== 'online');
      offlinePeers.forEach(peer => {
        if (peer.iceConnectionState === 'connected') {
          peer.close();
          peer = null;
        }
      });
      // notify if new peers joined or old one's disconnected
      if (onlinePeers.length !== this.notifier.peerConnections$.value.length) {
        this.notifier.peerConnections$.next(onlinePeers);
      }
      return data.filter(peer => peer.connectionId !== this.me.connectionId && peer.connectionState === 'online');
    }), catchError(
      err => {
        console.warn('Could not fetch the peers online status');
        return of(err);
      })
    );
  }

  connect(): Observable<MediaStream> {
    if (this.notifier.localStream$.value) {
      return this.notifier.localStream$;
    }
    this.auth.resetConnectionId();
    console.log('myConnectionId:', this.auth.myConnectionId);
    this.initSubscriptions();
    this.vidService.startCamera();
    return this.notifier.localStream$;
  }

  disconnect(): void {
    if (!this.notifier.localStream$.value) {
      return;
    }
    this.auth.setUserOfflineStatus();
    this.notifier.peerConnections$.value.forEach(peer => {
      peer.close();
      this.connections[peer.metaData.offer.connectionId] = null;
    });
    this.notifier.peerConnections$.next([]);
    this.notifier.localStream$.next(null);
    this.unsubscribeAll();
  }

  call(): void {
    console.log('Starting the call...');
    this.broadcast(JSON.stringify({ handshake: { type: 'offer', user: this.notifier.user$.value } }));
  }

  private initSubscriptions(): void {
    this.subscriptions.push(
      this.dbService.onCommunicationUpdate().subscribe((data) => { this.dataService.readMessage(data); },
        (err) => {
          this.notifier.localStream$.next(null);
          this.notifier.peerConnections$.next([]);
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
      this.notifier.iceServerReceived$.subscribe(message => {
        this.sdpService.iceServerReceived(message, this.connections[message.from.connectionId]);
      })
    );
    this.subscriptions.push(
      this.notifier.sdpReceived$.subscribe(message => {
        const fromId = message.from.connectionId;
        const conn = this.connections[fromId];
        this.sdpService.sdpReceived(message, conn);
      })
    );
    this.subscriptions.push(
      this.notifier.iceServerReceived$.subscribe(message => {
        this.sdpService.iceServerReceived(message, this.connections[message.from.connectionId]);
      })
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
      this.sdpService.createOffer(message.from, this.connections[message.from.connectionId]);
    }
  }

  private createNewPeerConnection(offerReq: IOfferRequest): void {
    const peerId = offerReq.connectionId;
    if (!this.connections[peerId]) {
      this.connections[peerId] = new RTCPeerConnection(this.iceServersConfig);
      this.connections[peerId].metaData = { offer: { connectionId: peerId, user: offerReq.user } };
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

  private broadcast(data: string): void {
    this.sendMessage('All', data);
  }

  private sendMessage(receiverId: any, data: string): void {
    this.dbService.sendCommunication({
      from: { connectionId: this.auth.myConnectionId, user: this.me }, to: receiverId.toString(), msg: data
    });
  }
}
