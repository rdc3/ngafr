import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as firebase from 'firebase/app';
import { IUserOnline, IMessage } from '../models/models';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';

@Injectable()
export class DbService {
  private connectionStatusCollection = '/connectionStatus/';
  private communicationCollection = 'communication';
  constructor(
    private fire: AngularFireDatabase
  ) { }

  setUserOnlineOrOffline(userId: string, status: any): void {
    this.fire.database.ref(this.connectionStatusCollection + userId).set(status,
      (err) => {
        if (err) {
          console.warn('Could not update the user status as online in the db', err);
        }
      });
  }
  setUserOfflineOnDisconnect(userId: string, status: any): void {
    const userStatusDatabaseRef = this.fire.database.ref(this.connectionStatusCollection + userId);
    userStatusDatabaseRef.onDisconnect().set(status,
      (err) => {
        if (err) {
          console.warn('Could not update the user status as online in the db', err);
        }
      });
  }
  onUserStatusChange(): Observable<IUserOnline[]> {
    return this.fire.list<IUserOnline>(this.connectionStatusCollection).valueChanges();
  }
  onCommunicationUpdate(): Observable<SnapshotAction<IMessage>> {
    return this.fire.list<IMessage>(this.communicationCollection).stateChanges(['child_added']);
  }
  sendCommunication(data: any): void {
    const dbMsg = this.fire.database.ref(this.communicationCollection).push(data, (error) => {
      if (error) {
        alert('You might not have the permission to use this application.');
      }
    });
    dbMsg.remove();
  }
  onAuthStateChanged(): Observable<firebase.User> {
    return new Observable((observer) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          observer.next(user);
        } else {
          observer.next(null);
        }
      }, err => {
        console.warn('Error occurred while fetching the Auth state change', err);
      });
    });
  }

}
