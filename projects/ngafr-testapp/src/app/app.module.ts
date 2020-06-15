import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FireBaseConfig } from '../environments/firebase';
import { AuthCodeComponent } from './auth/auth-code/auth-code.component';
import { AuthDemoComponent } from './auth/auth-demo/auth-demo.component';
import { ViewSelectorComponent } from './_common/view-selector/view-selector.component';
import { VideoChatCodeComponent } from './video/video-chat-code/video-chat-code.component';
import { VideoChatDemoComponent } from './video/video-chat-demo/video-chat-demo.component';
import { BandwidthPlotterDemoComponent } from './graph/bandwidth-plotter-demo/bandwidth-plotter-demo.component';
import { BandwidthPlotterCodeComponent } from './graph/bandwidth-plotter-code/bandwidth-plotter-code.component';
import { ICommunicationConfig } from 'projects/ngafr-communication/src/lib/models/models';
import { CommunicationConfig } from '../environments/ngafr.config';
import { NgafrAuthenticationModule, IFirebaseConf, IFirebaseAuthProviders } from 'ngafr-authentication';
import { NgafrCommunicationModule } from 'ngafr-communication';

const firebaseConfig: IFirebaseConf = FireBaseConfig;
const communicationConfig: ICommunicationConfig = CommunicationConfig;
const authProviders: IFirebaseAuthProviders = {
  googleAuthProvider: true,
  emailAuthProvider: true,
  githubAuthProvider: false,
  facebookAuthProvider: false,
  anonymousAuthProvider: false,
  phoneAuthProvider: false,
  twitterAuthProvider: false,
};
@NgModule({
  declarations: [
    AppComponent,
    AuthCodeComponent,
    AuthDemoComponent,
    ViewSelectorComponent,
    VideoChatCodeComponent,
    VideoChatDemoComponent,
    BandwidthPlotterDemoComponent,
    BandwidthPlotterCodeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    // NgafrAuthenticationModule,  // uncomment this line if you get compilation errors in the testapp demo template
    NgafrAuthenticationModule.forRoot(firebaseConfig, authProviders),
    NgafrCommunicationModule.forRoot(communicationConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
