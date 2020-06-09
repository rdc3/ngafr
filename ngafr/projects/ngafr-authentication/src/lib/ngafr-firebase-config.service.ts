import { Injectable } from '@angular/core';
import { FirebaseAuthProviders } from './ngafr-firebase-config.model';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

@Injectable()
export class FirebaseConfigService {

  static firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [],
    // tosUrl: '<your-tos-link>',
    // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
  };

  static getFirebaseUiAuthConfig(authProviders: FirebaseAuthProviders) {
    if (authProviders.googleAuthProvider) {
      FirebaseConfigService.firebaseUiAuthConfig.signInOptions.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
    }
    if (authProviders.facebookAuthProvider) {
      FirebaseConfigService.firebaseUiAuthConfig.signInOptions.push({
          scopes: [
            'public_profile',
            'email',
            'user_likes',
            'user_friends'
          ],
          customParameters: {
            auth_type: 'reauthenticate'
          },
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
        });
     }
    if (authProviders.emailAuthProvider) {
      FirebaseConfigService.firebaseUiAuthConfig.signInOptions.push({
        requireDisplayName: true,
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
      });
    }
    if (authProviders.twitterAuthProvider) {
      FirebaseConfigService.firebaseUiAuthConfig.signInOptions.push(firebase.auth.TwitterAuthProvider.PROVIDER_ID);
     }
    if (authProviders.githubAuthProvider) {
      FirebaseConfigService.firebaseUiAuthConfig.signInOptions.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);
     }
    if (authProviders.phoneAuthProvider) {
      FirebaseConfigService.firebaseUiAuthConfig.signInOptions.push(firebase.auth.PhoneAuthProvider.PROVIDER_ID);
     }
    if (authProviders.anonymousAuthProvider) {
      FirebaseConfigService.firebaseUiAuthConfig.signInOptions.push(firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID);
     }
    return FirebaseConfigService.firebaseUiAuthConfig;
  }

}
