import { InjectionToken } from '@angular/core';

export interface IFirebaseConf {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    storageBucket: string;
    projectId: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

export interface IFirebaseAuthProviders {
    googleAuthProvider?: boolean;
    facebookAuthProvider?: boolean;
    emailAuthProvider?: boolean;
    twitterAuthProvider?: boolean;
    githubAuthProvider?: boolean;
    phoneAuthProvider?: boolean;
    anonymousAuthProvider?: boolean;
}


