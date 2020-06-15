import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { database } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbService } from './firebase-db.service';
import { ConnNotifierService } from './conn-notifier.service';
import { IUserOnline } from '../models/models';

@Injectable()
export class AuthService {
  public myConnectionId = Math.floor(Math.random() * 1000000000);
  user: User;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private dbService: DbService,
    private notifier: ConnNotifierService,
    public router: Router
  ) {
    // this.signInWithGoogle().subscribe();
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.setUserOnlineStatus();
      } else {
        localStorage.removeItem('user');
        this.notifier.user$.next(null);
      }
    });
  }
  getLoggedInUser(): IUserOnline {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      avatar: user.photoURL,
      connectionId: this.myConnectionId,
      connectionState: 'online',
      emailId: user.email,
      id: user.uid,
      lastUpdated: database.ServerValue.TIMESTAMP,
      name: user.displayName
    };
  }
  setUserOnlineStatus(): void {
    const loggedUser = this.getLoggedInUser();
    this.notifier.user$.next(loggedUser);
    const isOnlineForDatabase: IUserOnline = loggedUser;
    this.dbService.setUserOnlineOrOffline(this.notifier.user$.value.id, isOnlineForDatabase);
    loggedUser.connectionState = 'offline';
    const isOfflineForDatabase: IUserOnline = loggedUser;

    this.dbService.onUserStatusChange().subscribe(snapshot => {
      database().ref('.info/connected').on('value', (data) => {
        if (data.val() === false) {
          return;
        }
        this.dbService.setUserOfflineOnDisconnect(this.notifier.user$.value.id, isOfflineForDatabase);
      },
      (err) => {
          console.log('Connection dropped...');
      });
    });
  }
  setUserOfflineStatus() {
    const loggedUser = this.getLoggedInUser();
    loggedUser.connectionState = 'offline';
    this.dbService.setUserOnlineOrOffline(this.notifier.user$.value.id, loggedUser);
  }
  resetConnectionId() {
    this.myConnectionId = Math.floor(Math.random() * 1000000000);
  }
}
