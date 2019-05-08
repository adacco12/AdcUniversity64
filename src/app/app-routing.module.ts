import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { LoginBarComponent } from './_layout/login-bar/login-bar.component';
import { HomeComponent } from './home/home.component';
import { GlavnaComponent } from './glavna/glavna.component';
import { Liststudents2Component } from './liststudents2/liststudents2.component';
import { TstudentComponent } from './tstudent/tstudent.component';
import { NgforComponent } from './ngfor/ngfor.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { NotloggedComponent } from './notlogged/notlogged.component';
import { PagingComponent } from './paging/paging.component';
import { NgxscrollingComponent } from './ngxscrolling/ngxscrolling.component';
import { NgxvirtpageComponent } from './ngxvirtpage/ngxvirtpage.component';
import { Ngxvirtpage3Component } from './ngxvirtpage3/ngxvirtpage3.component';

import { About0Component } from './about0/about0.component';

import { NovakComponent } from './About/novak/novak.component';
import { NadalComponent } from './About/nadal/nadal.component';
import { ArianaComponent } from './About/ariana/ariana.component';
import { FedererComponent } from './About/federer/federer.component';
import { LayoutComponent } from './About/layout/layout.component';
import { LeftSideComponent } from './About/left-side/left-side.component';
import { SajtsearchComponent } from './sajtsearch/sajtsearch.component';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'glavna', component: GlavnaComponent }
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: GlavnaComponent, pathMatch: 'full'},
      { path: 'glavna', component: GlavnaComponent },
      { path: 'home', component: HomeComponent },
      { path: 'notlogged', component: NotloggedComponent },
      { path: 'liststudents2', component: Liststudents2Component },
      { path: 'paging', component: PagingComponent },
      { path: 'tstudent', component: TstudentComponent },
      { path: 'ngfor', component: NgforComponent },
      { path: 'gst-get', component: GstGetComponent },
      { path: 'ngxscrolling', component: NgxscrollingComponent },
      { path: 'ngxvirtpage', component: NgxvirtpageComponent },
      { path: 'ngxvirtpage3', component: Ngxvirtpage3Component },
      { path: '', component: LayoutComponent,
        children: [
          { path: '', component: NovakComponent, pathMatch: 'full'},
          { path: 'novak', component: NovakComponent },
          { path: 'ariana', component: ArianaComponent },
          { path: 'federer', component: FedererComponent },
          { path: 'nadal', component: NadalComponent }

        ]
      },
      { path: 'about0', component: About0Component },
      { path: 'sajtsearch', component: SajtsearchComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
