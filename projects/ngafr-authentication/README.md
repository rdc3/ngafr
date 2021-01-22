# NgafrAuthentication

This library is used to add the firebase authentication (Email / Password or Social logins) using the directive *ngafrAuth in the html template of Angular project.

## Dependencies
    * [angular-fire-ui](https://www.npmjs.com/package/angular-fire-ui)

## Install
### ngafr-authentication package installation
    ```cmd
    npm i ngafr-authentication  --save
    ```
### Installation with dependencies
    ```cmd
    npm i firebase firebaseui @angular/fire firebaseui-angular ngafr-authentication --save
    ```

## Usage
* Update AppModule 
    ```ts
    const firebaseConfig = {
        apiKey: '*******',
        authDomain: '*******',
        databaseURL: '*******',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: ''
    };
    // Only choose the required Auth providers & omit the rest from this list
    const authProviders: FirebaseAuthProviders ={
        googleAuthProvider: true,
        emailAuthProvider: false,
        githubAuthProvider: false,
        facebookAuthProvider: false,
        AnonymousAuthProvider: false,
        phoneAuthProvider: false,
        twitterAuthProvider: false,
    };
    imports: [
        ...,
        NgafrAuthenticationModule
            .forRoot(firebaseConfig, authProviders),
        ...
    ]
    ```
* Use in a template
    ```html
    <div *ngafrAuth></div>
    ```
    or 
    ```html
    <ng-container *ngafrAuth></ng-container>
    ```
