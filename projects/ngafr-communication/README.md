# NgafrCommunication
This library can be used to add WebRTC based video conferencing functionalities to your app using structural directives

## Dependencies
    * [ngafr-authentication](https://www.npmjs.com/package/ngafr-authentication) : For authentication
    * [hark](https://www.npmjs.com/package/hark) : For events whether the user is speaking or not
    * [@angular/material](https://www.npmjs.com/package/@angular/material) : For Icons


## Usage
### APIs :
  * connect
      - Starts the webcam
      - Use ngafr-authentication library to login into the firebase before calling this method.
        ```ts
            connect(): Observable<boolean>;
        ```
  * onUserUpdate
      - Gives the firebase logged in user. Null if the user is not logged in
        ```ts
            onUserUpdate(): BehaviorSubject<IUserOnline>;
        ```
  * onPeersOnline
      - Gives the peers who are currently logged in.
        ```ts
            onPeersOnline(): Observable<IUserOnline[]>;
        ```
  * call
      - Starts the call with all the online peers
        ```ts
            call(): void;
        ```
  * disconnect
      - Disconnects the current ongoing call.
        ```ts
            disconnect(): void;
        ```
### Basic usage:
* AppModule:
    ```ts
        import { NgafrAuthenticationModule,
            IFirebaseConf, IFirebaseAuthProviders } from 'ngafr-authentication';
        import { NgafrCommunicationModule } from 'ngafr-communication';
        @NgModule( {
            imports: [
                ...,
                NgafrAuthenticationModule   // Refer ngafr-authentication
                .forRoot(firebaseConfig, authProviders),
                NgafrCommunicationModule.forRoot(communicationConfig)
                ...
            ]
        })
    ```

* Component:
    ```ts
        constructor( private comm: NgafrCommunicationService ) { }
        ngAfterViewInit() {
            this.comm.onUserUpdate().subscribe(user => {
                this.comm.connect().subscribe();
            });
        }
        call() { this.comm.call(); }
    ```

* Template:
    ```html
      <div *ngafrVideoSelf></div>
      <div *ngafrVideoPeers></div>
      <button (click)="call()"/>
    ```

### Get the logged in user:
    ```ts
        public user: any = { avatar: '' };
            this.comm.onUserUpdate().subscribe(user => {
            if (!user) { return; }
            this.user = user;
            this.connect();
            });
    ```
### Get all the online peers
    ```ts
        public onlinePeers: any = [];
            this.comm.onPeersOnline().subscribe(peers => {
                this.onlinePeers = peers;
            });
    ```
### Disconnect with all peers
    ```ts
        ngOnDestroy(): void {
            this.comm.disconnect();
        }
    ```