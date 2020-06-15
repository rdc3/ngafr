import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMessage, IUserOnline, IConnection } from '../models/models';

@Injectable()
export class ConnNotifierService {
  public online$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public handShakeReceived$: Subject<IMessage> = new Subject();
  public iceServerReceived$: Subject<IMessage> = new Subject();
  public sdpReceived$: Subject<IMessage> = new Subject();
  public textMessageReceived$: Subject<IMessage> = new Subject();
  public user$: BehaviorSubject<IUserOnline> = new BehaviorSubject(null);
  public peerConnections$: BehaviorSubject<IConnection[]> = new BehaviorSubject([]);
  public localStream$: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  constructor() { }
}
