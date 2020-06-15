import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IMessage } from '../models/models';
import { ConnNotifierService } from './conn-notifier.service';
import { SnapshotAction } from '@angular/fire/database';

@Injectable()
export class DataService {
  constructor(private auth: AuthService, private notifier: ConnNotifierService) { }

  private addressedToMe(to: string): boolean {
    return (to === this.auth.myConnectionId.toString() || to === 'All');
  }

  private parseData(data: any): IMessage {
    const msg = data.payload.val() as IMessage;
    if (this.addressedToMe(msg.to)) {
      msg.msg = JSON.parse(msg.msg);
    } else {
      msg.to = null;
      msg.from = null;
      msg.msg = null;
    }
    return msg;
  }

  public readMessage(data: SnapshotAction<IMessage>): void {
    const message: IMessage = this.parseData(data);
    if (message.from !== null && message.from.connectionId !== this.auth.myConnectionId) {
      if (message.msg.ice) { return; }    // ignore the ice sent from other sources
      if (message.msg.handshake) {
        this.notifier.handShakeReceived$.next(message);
      } else if (message.msg.iceservers !== undefined) {
        this.notifier.iceServerReceived$.next(message);
      } else if (message.msg.sdp) {
        this.notifier.sdpReceived$.next(message);
      } else if (message.msg.text) {
        this.notifier.textMessageReceived$.next(message);
      }
    }
  }

  public setMediaBitrates(sdp: any, bandwidthLimit: number): any {
    return this.setMediaBitrate(this.setMediaBitrate(sdp, 'video', bandwidthLimit), 'audio', bandwidthLimit);
  }

  private setMediaBitrate(sdp: any, media: string, bitrate: number): any {
    const lines = sdp.split('\n');
    let line = -1;
    let i;
    for (i = 0; i < lines.length; i++) {
      if (lines[i].indexOf('m=' + media) === 0) {
        line = i;
        break;
      }
    }
    if (line === -1) {
      // console.log('Could not find the m line for', media);
      return sdp;
    }
    // console.log('Found the m line for', media, 'at line', line);

    // Pass the m line
    line++;

    // Skip i and c lines
    while (lines[line].indexOf('i=') === 0 || lines[line].indexOf('c=') === 0) {
      line++;
    }

    // If we're on a b line, replace it
    if (lines[line].indexOf('b') === 0) {
      // console.log('Replaced b line at line', line);
      lines[line] = 'b=AS:' + bitrate;
      return lines.join('\n');
    }

    // Add a new b line
    // console.log('Adding new b line before line', line);
    let newLines = lines.slice(0, line);
    newLines.push('b=AS:' + bitrate);
    newLines = newLines.concat(lines.slice(line, lines.length));
    return newLines.join('\n');
  }

}
