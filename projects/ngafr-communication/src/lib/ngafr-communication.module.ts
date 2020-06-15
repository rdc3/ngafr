import { NgModule, ModuleWithProviders } from '@angular/core';
import { VideoTemplateComponent } from './templates/video/video-template.component';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { MediaService } from './services/media.service';
import { DbService } from './services/db.service';
import { ConnectionService } from './services/connection.service';
import { ConnNotifierService } from './services/conn-notifier.service';
import { VideoPeersDirective } from './directives/video-peers.directive';
import { VideoSelfDirective } from './directives/video-self.directive';
import { CommunicationConfigData } from './models/config';
import { NgafrCommunicationService } from './ngafr-communication.service';
import { ICommunicationConfig } from './models/models';



@NgModule({
  declarations: [VideoSelfDirective, VideoPeersDirective, VideoTemplateComponent],
  imports: [
    CommonModule,
    MatIconModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports: [VideoSelfDirective, VideoPeersDirective, VideoTemplateComponent],
  providers: [AuthService, DataService, MediaService, ConnNotifierService, DbService, ConnectionService, NgafrCommunicationService],
  entryComponents: [VideoTemplateComponent]
})
export class NgafrCommunicationModule {
  public static forRoot(commConfig: ICommunicationConfig): ModuleWithProviders {
    return {
      ngModule: NgafrCommunicationModule,
      providers: [
        { provide: CommunicationConfigData, useValue: commConfig },
        NgafrCommunicationService
      ]
    };
  }
}
