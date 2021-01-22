import { Injectable } from '@angular/core';
import { ConnNotifierService } from './services/conn-notifier.service';
import { ConnectionService } from './services/connection.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserOnline } from './models/models';

@Injectable({providedIn: 'root'})
export class NgafrCommunicationService {

  constructor(
    private notifier: ConnNotifierService,
    private conn: ConnectionService
  ) { }
  onUserUpdate(): BehaviorSubject<IUserOnline> {
    return this.notifier.user$;
  }
  connect(): Observable<boolean> {
    return this.conn.connect().pipe(map((stream) => !!stream ));
  }
  onPeersOnline(): Observable<IUserOnline[]> {
    return this.conn.onPeersOnline();
  }
  call(): void {
    this.conn.call();
  }
  disconnect(): void {
    this.conn.disconnect();
  }
}
