import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCodeComponent } from './auth/auth-code/auth-code.component';
import { AuthDemoComponent } from './auth/auth-demo/auth-demo.component';
import { VideoChatCodeComponent } from './video/video-chat-code/video-chat-code.component';
import { VideoChatDemoComponent } from './video/video-chat-demo/video-chat-demo.component';
import { BandwidthPlotterCodeComponent } from './graph/bandwidth-plotter-code/bandwidth-plotter-code.component';
import { BandwidthPlotterDemoComponent } from './graph/bandwidth-plotter-demo/bandwidth-plotter-demo.component';


const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'code',
        component: AuthCodeComponent,
        data: { num: 1 }
      },
      {
        path: 'demo',
        component: AuthDemoComponent,
        data: { num: 2 }
      }
    ]
  },
  {
    path: 'video',
    children: [
      {
        path: 'code',
        component: VideoChatCodeComponent,
        data: { num: 3 }
      },
      {
        path: 'demo',
        component: VideoChatDemoComponent,
        data: { num: 4 }
      }
    ]
  },
  {
    path: 'graph',
    children: [
      {
        path: 'code',
        component: BandwidthPlotterCodeComponent,
        data: { num: 5 }
      },
      {
        path: 'demo',
        component: BandwidthPlotterDemoComponent,
        data: { num: 6 }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/code'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
