import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { LoginBarComponent } from './_layout/login-bar/login-bar.component';
import { HomeComponent } from './home/home.component';
import { GlavnaComponent } from './glavna/glavna.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'glavna', component: GlavnaComponent }
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: GlavnaComponent, pathMatch: 'full'},
      { path: 'glavna', component: GlavnaComponent },
      { path: 'home', component: HomeComponent }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
