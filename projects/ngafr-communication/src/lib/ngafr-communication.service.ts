import { Injectable } from '@angular/core';
import { ConnNotifierService } from './services/conn-notifier.service';
import { ConnectionService } from './services/connection.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgafrCommunicationService {

  constructor(
    private notifier: ConnNotifierService,
    private conn: ConnectionService
  ) { }
  onUserUpdate() {
    return this.notifier.user$;
  }
  localStreamStarted() {
    return !!this.notifier.localStream$.value;
  }
  connect() {
    return this.conn.connect().pipe(map((stream) => !!stream ));
  }
  onPeersOnline() {
    return this.conn.onPeersOnline();
  }
  call() {
    this.conn.call();
  }
  disconnect() {
    this.conn.disconnect();
  }
}
