import { Component, OnInit } from '@angular/core';
import { NgafrAuthenticationComponent, NgafrAuthenticationService } from 'ngafr-authentication';
import { RouterOutlet } from '@angular/router';
import { routerAnimation } from './app-routing.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation()],
})
export class AppComponent implements OnInit {
  constructor(private auth: NgafrAuthenticationService) {
  }
  title = 'ngafr-testapp';
  ngOnInit(): void {
    // this.auth.signIn();
  }
  public getRouteAnimation(outlet: RouterOutlet) {
    const res =
      outlet.activatedRouteData.num === undefined
        ? -1
        : outlet.activatedRouteData.num;

    return res;
  }
}
