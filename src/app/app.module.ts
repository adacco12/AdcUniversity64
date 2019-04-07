import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { LoginBarComponent } from './_layout/login-bar/login-bar.component';
import { HomeComponent } from './home/home.component';
import { GlavnaComponent } from './glavna/glavna.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    LoginBarComponent,
    HomeComponent,
    GlavnaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
