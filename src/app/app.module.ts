import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {FileUploadModule} from 'ng2-file-upload';

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
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination';

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
