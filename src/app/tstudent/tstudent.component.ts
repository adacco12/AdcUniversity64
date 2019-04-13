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

import {HttpClient} from '@angular/common/http';
import * as $ from 'jquery';

import { MainService, ResultData } from '../main.service';
import { SubscriptionLike as ISubscription } from 'rxjs';

import { ImagecontrolService } from '../imagecontrol.service';
import {DbService} from '../db.service';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-tstudent',
  templateUrl: './tstudent.component.html',
  styleUrls: ['./tstudent.component.css']
})

export class TstudentComponent implements OnInit {
  public edited = true;
  public upl_vis = false;
  public chng_vis = true;

  public odg: any;
  public tdata: any;

  globv = environment;
  public sstudent_firstname: string;
  public sstudent_lastname: string;
  public sstudent_code: string;
  public sstudent_enrdate: string;
  public sstudent_email: string;
  public sstudent_address: string;
  public sstudent_age: string;

  public sstudent_id: string = '157';
  public sstudent_ordnum: string = '87';

  public dateTime1: Date;

  public tadresaSlike: string;
  public imgSrc = 'http://www.siteknower.com/UploadedImages/Photo007.jpg';
  public imgSrc0 = 'http://www.siteknower.com/UploadedImages/Photo000.jpg';

  public imgstyle = { };
  public timepicfajla = 'Photo000.jpg';

  tmessage = 'Dobro jutro jedan dva tri pet sest sedam osam devet';
  public emll = '';
  public scode = '';
  public fname = '';
  public lname = '';
  tfokusiraj = '';


  sub: ISubscription;

  @ViewChild('uploadWindow') uploadWindow: jqxWindowComponent;
  @ViewChild('messageWindow') messageWindow: jqxWindowComponent;

  @ViewChild('listBoxReference') myListBox: jqxListBoxComponent;

  @ViewChild('eml') inpeml: ElementRef;
  @ViewChild('scode') inpcode: ElementRef;
  @ViewChild('fname') inpfname: ElementRef;
  @ViewChild('lname') inplname: ElementRef;

  source: string[] = [
    'Form 1',
    'Form 2',
    'Form 3'
  ];

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    // dateFormat: 'dd.mm.yyyy',
    dateFormat: 'dd mmm yyyy',
    width: '200px',
  };
  // Initialized to specific date (09.10.2018).
  // public ssdatum: any = { date: { year: 2018, month: 10, day: 9 } };

  public ssdatum: any = { date: null };

  // @ViewChild('dateTimeInputReference') myDateTimeInput: jqxDateTimeInputComponent;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private location: Location,
    public selectedStudent: Student,
    private http: HttpClient,
    private ts: MainService,
    public dekl: Dekl,
    private imagecontrolService: ImagecontrolService,
  ) {
    this.sstudent_firstname = selectedStudent.FirstName;
    this.sstudent_lastname = selectedStudent.LastName;
    this.sstudent_code = selectedStudent.Code;
    this.sstudent_id = selectedStudent.IdStud.toString();
    this.sstudent_enrdate = selectedStudent.EnrDate;
    this.sstudent_email = selectedStudent.Email;
    this.sstudent_address = selectedStudent.Address;
    this.sstudent_age = selectedStudent.Age;
    this.emll = this.sstudent_email;
    // if (typeof this.sstudent_enrdate  !== 'undefined') {
    if (this.sstudent_enrdate  === null || this.sstudent_enrdate  === undefined) {
      this.ssdatum = {date: null};
    } else {
      // const tparseddate = Date.parse(this.sstudent_enrdate);
      const tparseddate = this.sstudent_enrdate.substring(0, 10);
      const tdat0 = new Date(tparseddate); // ISO format
      const ty = tdat0.getFullYear();
      const tm = tdat0.getMonth() + 1;
      const td = tdat0.getDate();

      this.ssdatum = {date: {year: ty, month: tm, day: td}};
    }

    let tekIdStudStr = '';
    if (this.sstudent_id.length === 1) {tekIdStudStr = '00' + this.sstudent_id ; }
    if (this.sstudent_id.length === 2) {tekIdStudStr = '0' + this.sstudent_id; }
    if (this.sstudent_id.length === 3) {tekIdStudStr = this.sstudent_id; }

    this.timepicfajla = 'Photo' + tekIdStudStr + '.jpg';
    this.globv.tSlikaFile = this.timepicfajla;
    this.tadresaSlike = 'http://www.siteknower.com/' + this.globv.tSlikeDir + '/Photo' + tekIdStudStr + '.jpg';

    // zbog image cachea u chrome:
    this.tadresaSlike =  this.tadresaSlike + '?' + new Date().getTime();
    // this.tadresaSlike = 'http://www.siteknower.com/UploadedImages/Photo007.jpg';
  }

  ngOnInit() {
    this.imgSrc =  this.tadresaSlike;
  }

  cancel(): void {
    this.globv.PONISTI = true;
    this.globv.DIALOGZATVOREN = true;
    this.location.back();
  }

  potvrdi(): void {
    if (this.globv.tIMEMDB === 'AdcUniversity') {
      this.tmessage = 'This is a demo database.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if (this.sstudent_code === null || this.sstudent_code  === undefined || this.sstudent_code.length === 0) {
      this.tfokusiraj = 'code';

      this.tmessage = 'You did not enter the code.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if (this.sstudent_firstname === null || this.sstudent_firstname  === undefined || this.sstudent_firstname.length === 0) {
      this.tfokusiraj = 'fname';

      this.tmessage = 'You did not enter the first name.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if (this.sstudent_lastname === null || this.sstudent_lastname  === undefined || this.sstudent_lastname.length === 0) {
      this.tfokusiraj = 'lname';

      this.tmessage = 'You did not enter the last name.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if (this.emll === null || this.emll  === undefined) {
      this.tfokusiraj = 'eml';

      this.tmessage = 'You did not enter the e-mail address.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if (this.emll.length === 0) {
      this.tfokusiraj = 'eml';

      this.tmessage = 'You did not enter the e-mail address.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }


    // const a = this.ssdatum.formatted;
    // alert(a);
    if (this.ssdatum !== null && this.ssdatum  !== undefined) {
      if (this.ssdatum.date !== null && this.ssdatum.date !== undefined) {
        const sdtt = this.ssdatum.date;
        // const ndtt = sdtt.replace(/\//g, '-')
        const ndtt = sdtt.year.toString() + '-' + sdtt.month.toString()  + '-' + sdtt.day.toString( );
        this.sstudent_enrdate = ndtt;
      }
    }

    this.globv.PONISTI = false;
    this.globv.DIALOGZATVOREN = true;

    this.sstudent_email = this.emll;

    this.selectedStudent.FirstName = this.sstudent_firstname;
    this.selectedStudent.LastName = this.sstudent_lastname;
    this.selectedStudent.Code = this.sstudent_code;
    this.selectedStudent.EnrDate = this.sstudent_enrdate;
    this.selectedStudent.Email = this.sstudent_email;
    this.selectedStudent.Address = this.sstudent_address;
    this.selectedStudent.Age = this.sstudent_age;
    this.location.back();
  }

  upload(): void {
    if (this.globv.tIMEMDB === 'AdcUniversity') {
      this.tmessage = 'This is a demo database.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.uploadWindow.position('center');
    this.uploadWindow.open();
  }

  ImageExist(url): any {
    const img = new Image();
    img.src = url;
    let rtn = 0;
    if (img.height !== 0) {
      rtn = 1;
    } else {
      rtn = 0;
    }
    // return img.height != 0;
    return rtn;
  }

  onErrorLoadPic(): void {
    this.imgSrc = this.imgSrc0;
    // alert('err pic' );
    this.upl_vis = true;
    this.chng_vis = false;
  }

  closeUpload(): void {

    this.uploadWindow.close();
    this.tadresaSlike =  this.tadresaSlike + '?' + new Date().getTime();
    this.imgSrc =  this.tadresaSlike;
  }

  closeMessage(): void {
    this.messageWindow.close();

    if (this.tfokusiraj === 'eml') {
      this.inpeml.nativeElement.focus();
    }
    if (this.tfokusiraj === 'code') {
      this.inpcode.nativeElement.focus();
    }
    if (this.tfokusiraj === 'fname') {
      this.inpfname.nativeElement.focus();
    }
    if (this.tfokusiraj === 'lname') {
      this.inplname.nativeElement.focus();
    }
  }

  validateEmail(temail): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(temail);
  }

  validateMail(gemail): number {
    let rslt = 0;
    // var email = $("#txtEmail").val();
    if (gemail === '') {return 1;}
    if (this.validateEmail(gemail)) {
      rslt = 1;
    } else {
      rslt = 0;
    }
    return rslt;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  print(): void {

    // let timebaze = this.globv.tIMEMDB;
    let timebaze = this.storage.get('ime_mdb');

    // this.UbacislikuUBazu();

    // return;

    let tqr = 'USE ' + timebaze + ';';
    tqr = tqr + ' Select *';
    tqr = tqr + ' from Students ';
    tqr = tqr + ' where IdStud=' + this.sstudent_id;

    // var selectedValue = $scope.selectedValue;
    let selectedValue = 'Form 1';

    let tbrj = 1;
    if (selectedValue === 'Form 1') {
      tbrj = 1;
    }
    if (selectedValue === 'Form 2') {
      tbrj = 2;
    }
    if (selectedValue === 'Form 3') {
      tbrj = 3;
    }

    let q = 0;
    const tnapapir = '0';

    let timereporta = 'Student' + tbrj.toString() + '.rpt';
    let url = 'http://www.test.siteknower.com/ReportCrystal.aspx?query1=' + tqr + '&imebaze=' + timebaze + '&imetablice=' + 'Students' + '&imereporta=' + timereporta + '&napapir=' + tnapapir;
    // let url = 'http://www.test.siteknower.com/ReportCrystal.aspx?query1=USE AdcUniversity; Select * from Students where IdStud=7&imebaze=AdcUniversity&imetablice=Students&imereporta=Student1.rpt&napapir=0';
    let th = screen.height - 100;
    let tw = 910;

    const win = window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=20,left=20,width=' + tw + ',height=' + th);

    win.focus();
  }
  //
  // UbacislikuUBazu(): void {
  //   alert('ubacujem');
  //
  //   this.imagecontrolService.getData4();
  //
  //   this.imagecontrolService.getData4()
  //     .subscribe(data => {
  //       this.tdata = data;
  //
  //     });
  // }

  Pozdrav(response): void {
    const a = String(response.d);
    alert(a);
  }

  servis(): void {

    this.imagecontrolService.getData3()
      .subscribe(data => {
        this.tdata = data;
        alert(this.tdata);
      });

  }

  stampaj(tnapapir): void {
    // alert('stampaj');
    // this.myListBox.selectIndex(2);
    // let a = this.myListBox.getSelectedIndex()
    // alert('to je ' + a.toString());

    let timebaze = this.storage.get('ime_mdb');

    let tqr = 'USE ' + timebaze + ';';
    tqr = tqr + ' Select *';
    tqr = tqr + ' from Students ';
    tqr = tqr + ' where IdStud=' + this.sstudent_id;

    let tbrj = 1;
    tbrj = this.myListBox.getSelectedIndex() + 1;

    // const tnapapir = '0';

    let timereporta = 'Student' + tbrj.toString() + '.rpt';
    let url = 'http://www.test.siteknower.com/ReportCrystal.aspx?query1=' + tqr + '&imebaze=' + timebaze + '&imetablice=' + 'Students' + '&imereporta=' + timereporta + '&napapir=' + tnapapir;
    // let url = 'http://www.test.siteknower.com/ReportCrystal.aspx?query1=USE AdcUniversity; Select * from Students where IdStud=7&imebaze=AdcUniversity&imetablice=Students&imereporta=Student1.rpt&napapir=0';
    let th = screen.height - 100;
    let tw = 910;

    const win = window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=20,left=20,width=' + tw + ',height=' + th);

    win.focus();

  }
}

