# NgafrModules

Angular libraries to create a WebRTC video conferencing app using firebase

## USAGE

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
Modify the [firebase config file](https://github.com/rdc3/ngafr/blob/master/projects/ngafr-testapp/src/environments/firebase.ts)
Update the authProviders in [app.module.ts](https://github.com/rdc3/ngafr/blob/master/projects/ngafr-testapp/src/app/app.module.ts) with the required auth providers during the login

```cmd
npm run start
```
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development
