import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { FirebaseUIModule } from 'firebaseui-angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IFirebaseConf, IFirebaseAuthProviders } from './ngafr-firebase-config.model';
import { FirebaseConfigService } from './ngafr-firebase-config.service';
import { NgafrAuthDirective } from './ngafr-authentication.directive';
import { NgafrAuthenticationComponent } from './ngafr-authentication.component';

export const FirebaseConfigData = new InjectionToken<IFirebaseConf>('FIREBASECONF');


@NgModule({
  declarations: [NgafrAuthDirective, NgafrAuthenticationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireAuthModule,
    FirebaseUIModule
  ],
  exports: [NgafrAuthDirective, NgafrAuthenticationComponent],
  providers: [FirebaseConfigService],
  entryComponents: [NgafrAuthenticationComponent]
})

export class NgafrAuthenticationModule {
  public static forRoot(firebaseConfig: IFirebaseConf, authProviders: IFirebaseAuthProviders): ModuleWithProviders {
    const firebaseUiAuthConfig = FirebaseConfigService.getFirebaseUiAuthConfig(authProviders);
    return {
      ngModule: NgafrAuthenticationModule,
      providers: [
        FirebaseConfigService,
        AngularFireModule.initializeApp(firebaseConfig).providers,
        {provide: FirebaseConfigData, useValue: firebaseConfig},
        FirebaseUIModule.forRoot(firebaseUiAuthConfig).providers
      ]
    };
  }
}


