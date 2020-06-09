import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgafrAuthenticationModule, FirebaseConf, FirebaseAuthProviders } from 'ngafr-authentication';
import { FireBaseConfig } from '../environments/firebase';
import { AuthCodeComponent } from './auth/auth-code/auth-code.component';
import { AuthDemoComponent } from './auth/auth-demo/auth-demo.component';
import { ViewSelectorComponent } from './common/view-selector/view-selector.component';
import { VideoChatCodeComponent } from './video/video-chat-code/video-chat-code.component';
import { VideoChatDemoComponent } from './video/video-chat-demo/video-chat-demo.component';
import { BandwidthPlotterDemoComponent } from './graph/bandwidth-plotter-demo/bandwidth-plotter-demo.component';
import { BandwidthPlotterCodeComponent } from './graph/bandwidth-plotter-code/bandwidth-plotter-code.component';

const firebaseConfig: FirebaseConf = FireBaseConfig;
const authProviders: FirebaseAuthProviders = {
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
    NgafrAuthenticationModule,
    NgafrAuthenticationModule.forRoot(firebaseConfig, authProviders),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
