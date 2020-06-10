# NgafrModules

Angular libraries to create a WebRTC video conferencing app using firebase


## USAGE
### Authentication
* Run `npm i ngafr-authentication`
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
<div libNgafrAuth></div>
```

## Development - Application
### Download Source code
Run `git clone https://github.com/rdc3/ngafr`

### Download NPM packages
```cmd
npm i
```

### Build Authentication module
```cmd
npm run build:auth
```

### Build Communication module
```cmd
npm run build:comm
```

### Build Monitoring module
```cmd
npm run build:mon
```

### Start the App
* Modify the [firebase config file](https://github.com/rdc3/ngafr/blob/master/projects/ngafr-testapp/src/environments/firebase.ts) file
* Update the authProviders in [app.module.ts](https://github.com/rdc3/ngafr/blob/master/projects/ngafr-testapp/src/app/app.module.ts) with the required auth providers during the login
    ```cmd
    npm run start
    ```
* Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development - Libraries
### Building the modules in watch mode
* If you need to develop the libraries, then you can build the libraries in the watch mode in separate terminal windows with the below commands
    ```cmd
    npm run build:auth-watch
    npm run build:comm-watch
    npm run build:mon-watch
    ```
* Then start the app
    ```cmd
    npm run start
    ```
