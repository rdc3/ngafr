import { Injectable } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgafrAuthenticationService {
  private loggedIn = false;
  private user: firebase.User = null;
  constructor(
    private afAuth: AngularFireAuth,
  ) { }
  isUserLoggedIn(): Observable<void | firebase.User> {
      return this.afAuth.authState.pipe(map(user => {
        console.log('User: ', (user && user.email) ? user.displayName : 'Guest');
        this.loggedIn = (!!user && !!user.email);
        this.user = user;
        return user;
      }),
        catchError((e) => of(console.log('exception:', e))
      ));
  }
  logout() {
    this.afAuth.signOut();
  }

  loginSuccessCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);
    this.loggedIn = true;
    // this.router.navigate(['page']);
  }

  loginErrorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
    this.loggedIn = false;
  }
  // isUserLoggedIn(): boolean {
  //   return this.loggedIn;
  // }
}
