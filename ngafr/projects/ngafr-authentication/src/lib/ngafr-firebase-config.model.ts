import { InjectionToken } from '@angular/core';

export interface FirebaseConf {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    storageBucket: string;
    projectId: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

export interface FirebaseAuthProviders {
    googleAuthProvider?: boolean;
    facebookAuthProvider?: boolean;
    emailAuthProvider?: boolean;
    twitterAuthProvider?: boolean;
    githubAuthProvider?: boolean;
    phoneAuthProvider?: boolean;
    anonymousAuthProvider?: boolean;
}


