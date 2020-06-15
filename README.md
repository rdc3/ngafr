# NgafrModules

Angular libraries to create a WebRTC video conferencing app using firebase
* **Authentication Module:**
    Add Email/Password or Social logins based authentication to your applications using a structural directive
* **Communication Module:**
    Add WebRTC based video conferencing functionalities to your app using structural directives
* **Monitoring Module:**
    Monitor the bandwidth consumed by each video stream added via the communication module.


## USAGE
### ngafr-authentication
    [ReadMe](https://github.com/rdc3/ngafr/blob/master/projects/ngafr-authentication/README.md)

### ngafr-communication
    [ReadMe](https://github.com/rdc3/ngafr/blob/master/projects/ngafr-communication/README.md)

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
* Create a firebase app. [Reference](https://firebase.google.com/docs/web/setup)
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
