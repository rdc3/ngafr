# NgafrAuthentication

This library is used to add the firebase authentication (Email / Password or Social logins) using the directive *ngafrAuth in the html template of Angular project.

## Code scaffolding

To add this library to your project
* Run `npm i ngafr-authentication`
* Import library into the application module
```ts
import { NgafrAuthenticationModule, FirebaseConf, FirebaseAuthProviders } from 'ngafr-authentication';

const config: FirebaseConf = {
    apiKey: '*******',
    authDomain: '*******',
    databaseURL: '*******',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
};
const authProviders: FirebaseAuthProviders = {
    googleAuthProvider: true,
    emailAuthProvider: true,
    githubAuthProvider: true,
    facebookAuthProvider: true,
    anonymousAuthProvider: true,
    phoneAuthProvider: true,
    twitterAuthProvider: true,
};
```
* Add `*ngafr-auth` directive to a `<ng-container>` element
```html
<ng-container ngafrAuth></ng-container>
```
