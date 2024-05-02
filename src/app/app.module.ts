import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {FileUploadModule} from 'ng2-file-upload';

import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxCheckBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcheckbox';
import { jqxWindowComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
// import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';
import { MyDatePickerModule } from 'mydatepicker';
import { StorageServiceModule } from 'angular-webstorage-service';

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
// import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination';

import {NgxPrintModule} from 'ngx-print';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { LoginBarComponent } from './_layout/login-bar/login-bar.component';
import { HomeComponent } from './home/home.component';
import { GlavnaComponent } from './glavna/glavna.component';
import { Liststudents2Component } from './liststudents2/liststudents2.component';
import { TstudentComponent } from './tstudent/tstudent.component';
import { UploadComponent } from './upload/upload.component';
import { NgforComponent } from './ngfor/ngfor.component';
import { NotloggedComponent } from './notlogged/notlogged.component';
import { PagingComponent } from './paging/paging.component';
import { NgxscrollingComponent } from './ngxscrolling/ngxscrolling.component';
import { NgxvirtpageComponent } from './ngxvirtpage/ngxvirtpage.component';
import { Ngxvirtpage3Component } from './ngxvirtpage3/ngxvirtpage3.component';
import { NovakComponent } from './About/novak/novak.component';
import { NadalComponent } from './About/nadal/nadal.component';
import { ArianaComponent } from './About/ariana/ariana.component';
import { FedererComponent } from './About/federer/federer.component';
import { LayoutComponent } from './About/layout/layout.component';
import { LeftSideComponent } from './About/left-side/left-side.component';
import { About0Component } from './about0/about0.component';
import { SajtsearchComponent } from './sajtsearch/sajtsearch.component';
import { TestdialComponent } from './testdial/testdial.component';
import { Tstudent2Component } from './tstudent2/tstudent2.component';

const routes: Routes = [

];


@NgModule({
  declarations: [
    AppComponent,
    jqxGridComponent,
    jqxButtonComponent,
    jqxCheckBoxComponent,
    jqxWindowComponent,
    // jqxDateTimeInputComponent,
    jqxListBoxComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    LoginBarComponent,
    HomeComponent,
    GlavnaComponent,
    Liststudents2Component,
    TstudentComponent,
    UploadComponent,
    NgforComponent,
    NotloggedComponent,
    PagingComponent,
    NgxscrollingComponent,
    NgxvirtpageComponent,
    Ngxvirtpage3Component,
    NovakComponent,
    NadalComponent,
    ArianaComponent,
    FedererComponent,
    LayoutComponent,
    LeftSideComponent,
    About0Component,
    SajtsearchComponent,
    TestdialComponent,
    Tstudent2Component
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MyDatePickerModule,
    MatCardModule,
    StorageServiceModule,
    FileUploadModule,
    ScrollingModule,
    Ng2OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxPrintModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// RouterModule.forRoot(routes, { useHash: true })
// zato da bi se na serveru mogao raditi refresh tj reload 
