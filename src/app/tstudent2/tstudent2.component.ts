import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';

import { Location } from '@angular/common';

import { Student } from '../student.service';
import {Dekl} from '../dekl.service';

import { environment } from '../../environments/environment';

// import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { MyDatePickerModule } from 'mydatepicker';
import {IMyDpOptions} from 'mydatepicker';
import {jqxWindowComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import {jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';

import { NgxXml2jsonService } from 'ngx-xml2json';

import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';

import { MainService, ResultData } from '../main.service';
import { SubscriptionLike as ISubscription } from 'rxjs';

import { ImagecontrolService } from '../imagecontrol.service';
// import {NgxPrintModule} from 'ngx-print';

import {DbService} from '../db.service';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { DbmongoService } from '../dbmongo.service';
import {Dummy} from '../dummy.service';

@Component({
  selector: 'app-tstudent2',
  templateUrl: './tstudent2.component.html',
  styleUrls: ['./tstudent2.component.css']
})
export class Tstudent2Component implements OnInit {
  public edited = true;

  public sstudentFirstname: string;
  public sstudentLastname: string;
  public sstudentCode: string;

  constructor(
    private location: Location,
    public selectedStudent: Student,
    public dekl: Dekl

  ) {
    this.sstudentFirstname = selectedStudent.FirstName;
    this.sstudentLastname = selectedStudent.LastName;
    this.sstudentCode = selectedStudent.Code;
  }

  ngOnInit() {

    let a = this.selectedStudent.FirstName;

    //this.sstudentFirstname = 'Kemo';

    // this.sstudentFirstname = this.selectedStudent.FirstName;
    // this.sstudentLastname = this.selectedStudent.LastName;
    // this.sstudentCode = this.selectedStudent.Code;

  }

  potvrdi(): void {
    alert('potvrdi');

    this.dekl.StudentPONISTI = false;

    this.selectedStudent.FirstName = this.sstudentFirstname;
    this.selectedStudent.LastName = this.sstudentLastname;
    this.selectedStudent.Code = this.sstudentCode;

    this.location.back();
  }

  cancel(): void {
    alert('cancel');
    this.dekl.StudentPONISTI = true;
    // this.globv.DIALOGZATVOREN = true;
    this.location.back();
  }

}
