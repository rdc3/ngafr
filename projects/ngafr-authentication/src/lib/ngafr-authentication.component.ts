import { Component, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { NgafrAuthenticationService } from './ngafr-authentication.service';

@Component({
  selector: 'lib-ngafr-authentication',
  template: `
    <ng-template #ngafrAuthElement>
      <firebase-ui (signInSuccessWithAuthResult)="this.ngafrAuth.loginSuccessCallback($event)"
                   (signInFailure)="this.ngafrAuth.loginErrorCallback($event)"></firebase-ui>
      <button *ngIf="loggedIn" (click)="this.ngafrAuth.logout()">Logout</button>
    </ng-template>
  `,
  styleUrls: [
    './ngafr-authentication.component.css',
    '../../../../node_modules/firebaseui/dist/firebaseui.css'
  ],
  encapsulation: ViewEncapsulation.None
})

export class NgafrAuthenticationComponent {
  @ViewChild('ngafrAuthElement', { static: true }) ngafrAuthElement: TemplateRef<any>;
  public loggedIn = false;
  constructor(
    public ngafrAuth: NgafrAuthenticationService) {
    this.ngafrAuth.isUserLoggedIn().subscribe(user => {
      if (user) {
        this.loggedIn = true;
        console.log('logged in:', this.loggedIn);
      } else {
        console.log('logged in: unknown');
      }
    });
  }
}
