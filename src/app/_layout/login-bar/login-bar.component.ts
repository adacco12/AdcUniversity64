import { Component, OnInit, ViewChild, AfterViewInit, Renderer2 , ElementRef, Inject, Injectable} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { jqxWindowComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import { environment } from '../../../environments/environment';

import { Student } from '../../student.service';
import { Dekl} from '../../dekl.service';

import { jqxCheckBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcheckbox';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

import {DbService} from '../../db.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})

// export class LoginBarComponent implements OnInit {
@Injectable()
export class LoginBarComponent {
  tdata: any;
  globv = environment;

  tLogovanjeHdn = false;
  tLoggedHdn = true;

  tLogTipHdn1 = false;
  tLogTipHdn2 = true;
  tLogTipHdn3 = true;
  tLogTipHdn4 = true;

  mdl_login = 'zeljko';
  login_name1 = '';
  login_name2 = '';
  login_name3 = '';
  pswd = '';
  emll = '';
  emll2 = '';

  tmessage: string = 'Dobro jutro jedan dva tri pet sest sedam osam devet';
  tfokusiraj = '';
  demochecked = true;

  tmember = '123abc';

  public sstudent: string;
  // private tstdnt: Student;
  private tstdnt = new Student;

  private tuserid = '';
  private tpassword = '';
  private tid = '';

  @ViewChild('loginWindow') loginWindow: jqxWindowComponent;
  @ViewChild('CheckBox1') CheckBox1: jqxCheckBoxComponent;
  @ViewChild('messageWindow') messageWindow: jqxWindowComponent;

  @ViewChild('lgn1') inplgn1: ElementRef;
  @ViewChild('eml') inpeml: ElementRef;
  @ViewChild('eml2') inpeml2: ElementRef;
  @ViewChild('lgn2') inplgn2: ElementRef;
  @ViewChild('pswdd') inpswd: ElementRef;
  @ViewChild('lgn3') inplgn3: ElementRef;

  @ViewChild('name2') nameField: ElementRef;

  // constructor(
  //   private renderer: Renderer2,
  //   @Inject(LOCAL_STORAGE) private storage: StorageService
  //   // public selectedStudent: Student,
  //   // public dekl: Dekl
  // ) {
  //
  // }

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
              private dbService: DbService,
              public dekl: Dekl,
              private router: Router
  ) {}


  // this.globv.DEMO
  renderer2: Renderer2;

  ngOnInit() {
    this.login_name1 = '';
    this.pswd = '';
    this.emll = '';
    // this.selectedStudent = this.tstdnt;
  }

  ngAfterViewInit(): void {
    // this.CheckBox1.check();
    this.CheckBox1.checked(false);

    this.init_member();
  }

  Login_click(): void {
    // this.selectedStudent.FirstName = 'zeljko';
    // alert('Login');
    this.tLogTipHdn1 = false;
    this.tLogTipHdn2 = true;
    this.tLogTipHdn4 = true;

    this.loginWindow.title('Login');
    this.loginWindow.position('center');
    this.loginWindow.open();
  }

  spnDemo_click(): void {
    // this.selectedStudent.FirstName = 'zeljko';
    // alert('Dwmko');
    if (this.CheckBox1.checked() === true) {
      // alert('cheched');
      this.CheckBox1.checked(false);
    } else {
      this.CheckBox1.checked(true);
      // alert('unheched');
    }
  }

  spnSignIn_click(): void {
    // alert('SignIn');

    this.tLogTipHdn1 = true;
    this.tLogTipHdn2 = false;
    this.tLogTipHdn3 = true;
    this.tLogTipHdn4 = true;

  }

  spnLogIn_click(): void {
    // alert('SignIn');

    this.tLogTipHdn1 = false;
    this.tLogTipHdn2 = true;
    this.tLogTipHdn3 = true;
    this.tLogTipHdn4 = true;

  }

  spnForgot_click(): void {
    this.tLogTipHdn1 = true;
    this.tLogTipHdn2 = true;
    this.tLogTipHdn3 = false;
    this.tLogTipHdn4 = true;

  }

  hideWindow(): void {
    this.loginWindow.close();
  }

  SignIn(): void {

    if (this.CheckBox1.checked() === false) {
      this.globv.DEMO = false;

      if (this.login_name1.length === 0) {
        this.tfokusiraj = 'login_name1';

        this.tmessage = 'You did not enter the user name.';
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

      if ( this.validateMail(this.emll) === 0) {
        this.tfokusiraj = 'eml';

        this.tmessage = 'Incorrect email address.';
        this.messageWindow.position('center');
        this.messageWindow.open();
        return;
      }
    } else {
      this.globv.DEMO = true;
    }

    // this.closeLogin();

    this.tLogTipHdn1 = true;
    this.tLogTipHdn2 = true;
    this.tLogTipHdn3 = true;
    this.tLogTipHdn4 = false;

  }

  LogIn(): void {
    if (this.CheckBox1.checked() === true) {
      this.tmember = 'DEMO';
      this.tLogovanjeHdn = true;
      this.tLoggedHdn = false;

      this.dekl.ulogovan = true;

      this.globv.tIMEMDB = 'AdcUniversity';
      this.globv.tSlikeDir = 'UploadedImages';
      this.storage.set('ime_mdb', this.globv.tIMEMDB);
      this.storage.set('member_name', 'DEMO');
      this.storage.set('tSlikeDir', this.globv.tSlikeDir);

      this.closeLogin();

      this.router.navigate(['home']);
      return;
    }

    //alert('login');
    if (this.login_name2.length === 0) {
      this.tfokusiraj = 'login_name2';

      this.tmessage = 'You did not enter the user name.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if (this.pswd.length === 0) {
      this.tfokusiraj = 'pswd';

      this.tmessage = 'You did not enter the password.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    // this.tmember = this.login_name2;
    // this.tLogovanjeHdn = true;
    // this.tLoggedHdn = false;
    // this.storage.set('member_name', this.login_name2);

    this.dajPassword(this.login_name2, this.pswd);


  }

  Ask(): void {
    // alert('Ask');

    if (this.login_name3.length === 0) {
      this.tfokusiraj = 'login_name3';

      this.tmessage = 'You did not enter the user name.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if (this.emll2.length === 0) {
      this.tfokusiraj = 'eml2';

      this.tmessage = 'You did not enter the e-mail address.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    if ( this.validateMail(this.emll2) === 0) {
      this.tfokusiraj = 'eml2';

      this.tmessage = 'Incorrect email address.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }


  }

  closeMessage(): void {
    this.messageWindow.close();

    this.setFocus(this.tfokusiraj);

  }

  closeLogin(): void {
    this.loginWindow.close();
    this.Login_closed();
  }

  setFocus(telement): void {
    if (telement === 'login_name1') {
      this.inplgn1.nativeElement.focus();
    }
    if (telement === 'eml') {
      this.inpeml.nativeElement.focus();
    }

    if (telement === 'login_name2') {
      this.inplgn2.nativeElement.focus();
    }

    if (telement === 'pswd') {
      this.inpswd.nativeElement.focus();
    }

    if (telement === 'login_name3') {
      this.inplgn3.nativeElement.focus();
    }
    if (telement === 'eml2') {
      this.inpeml2.nativeElement.focus();
    }

  }

  editName(): void {
    // this.nameField.nativeElement.focus();
    this.inplgn1.nativeElement.focus();
  }

  Signin_click(): void {
    this.tLogTipHdn1 = true;
    this.tLogTipHdn2 = false;
    this.tLogTipHdn4 = true;

    this.loginWindow.title('Sign in');
    this.loginWindow.position('center');
    this.loginWindow.open();
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


  init_member(): void {
    // alert('init');

    if (this.storage.get('member_name') != null) {
      this.tmember = this.storage.get('member_name');
      this.tLogovanjeHdn = true;
      this.tLoggedHdn = false;

      this.dekl.ulogovan = true;

    }
    if (this.storage.get('ime_mdb') != null) {
      this.globv.tIMEMDB = this.storage.get('ime_mdb');
    }
    if (this.storage.get('tSlikeDir') != null) {
      this.globv.tSlikeDir = this.storage.get('tSlikeDir');
    }

  }

  spnLogout_click(): void {

    this.storage.remove('member_name');
    this.tLogovanjeHdn = false;
    this.tLoggedHdn = true;

    this.dekl.ulogovan = false;

    this.login_name2 = '';
    this.pswd = '';
    this.dekl.ulogovan = false;

    this.router.navigate(['home']);
  }

  CloseLogin(event: any): void  {
    // Do Something
    //alert('CloseLogin');
  }

  Login_closed(): void {
    // alert('ClosedLogin2');

  }

  //
  public dajPassword(fLoggin, fPassword): any {

    // const tLoggin = 'aaa';

    // alert('dajPassword' + fLoggin);

    this.dbService.GetUserPassword('AdcUniversity', fLoggin)
      .subscribe(data => {
        let datagStudentiGrid = [];

        this.tdata = data;

        let i = 0;
        this.tuserid  = '';
        this.tpassword   = '';
        this.tid   = '';

        if (this.tdata.length === 0) {
          this.tpassword = 'Nema';
          this.tuserid = '';

          this.tfokusiraj = 'login_name2';

          this.tmessage = 'Enter the user name.';
          this.messageWindow.position('center');
          this.messageWindow.open();

        } else {
          this.tpassword = this.tdata[0].Password;
          this.tuserid = this.tdata[0].UserId;
          this.tid = this.tdata[0].Id;

          if (this.tpassword === fPassword) {
            this.tmember = this.login_name2;
            this.tLogovanjeHdn = true;
            this.tLoggedHdn = false;
            this.storage.set('member_name', this.login_name2);
            if (this.tid === '1') {
              this.globv.tIMEMDB = 'AdcUniversity';
              this.globv.tSlikeDir = 'UploadedImages';
            } else {
              this.globv.tIMEMDB = 'AdcUniversity' + this.tid;
              this.globv.tSlikeDir = 'UploadedImages' + this.tid;
            }
            this.storage.set('ime_mdb', this.globv.tIMEMDB);
            this.storage.set('tSlikeDir', this.globv.tSlikeDir);

            this.closeLogin();
            this.dekl.ulogovan = true;

            //localStorage.setItem('member_name', 'Grijak Yeljko');

            this.router.navigate(['home']);

          } else {
            this.tfokusiraj = 'pswd';

            this.tmessage = 'Wrong password.';
            this.messageWindow.position('center');
            this.messageWindow.open();
          }
        }


        // alert(this.tpassword);
        // alert(this.selectedStudent.FirstName + ' ' + this.selectedStudent.LastName);

      });

  }

  public keypressed(tkey: string): any {
    this.CheckBox1.checked(false);
  }

  checkBox11OnChange(tevent): void {
  }

}
