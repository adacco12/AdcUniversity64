import {Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

// import { DOCUMENT } from '@angular/common'

import { Student } from '../student.service';
import { DbService } from '../db.service';
import { environment } from '../../environments/environment';

import {Dekl} from '../dekl.service';
// import {MessageComponentsService} from '../message.components.service';
import {Dummy} from '../dummy.service';
import {Subscription} from 'rxjs';
// import {ListStudComponent} from '../list-stud/list-stud.component';

import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {jqxWindowComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import { DbmongoService } from '../dbmongo.service';


@Component({
  selector: 'app-liststudents2',
  templateUrl: './liststudents2.component.html',
  styleUrls: ['./liststudents2.component.css']
})

export class Liststudents2Component implements AfterViewInit {
  public checkStatus: boolean;

  globv = environment;

  tdata: any;
  trefreshgrid: string;
  // public tselectedindex = 0;
  public tselectedindex = this.globv.tselind;

  tWaitHdn = false;

  public tpozdrav: string = 'dobar dan';
  tmessage = 'Dobro jutro jedan dva tri pet sest sedam osam devet';

  @ViewChild('areyousureWindow') areyousureWindow: jqxWindowComponent;
  @ViewChild('messageWindow') messageWindow: jqxWindowComponent;
  @ViewChild('studentWindow') studentWindow: jqxWindowComponent;


  data: any[];

  public ttImeMdb = 'AdcUniversity';

  tsource: any =
    {
      localdata: this.data,

      datafields:
        [
          {name: '_id', type: 'string', map: '0'},
          {name: 'IdStud', type: 'string', map: '0'},
          {name: 'Code', type: 'string', map: '1'},
          {name: 'FirstName', type: 'string', map: '2'},
          {name: 'LastName', type: 'string', map: '3'}
        ],
      datatype: 'array'
    };

  dataAdapter: any = new jqx.dataAdapter(this.tsource);

  settings: jqwidgets.GridOptions = {
    // width: 455,
    width: '99%',
    //height: 285,
    //height: '90%',
    height: 'calc(100% - 60px)',
    // height: 1op80,
    source: this.dataAdapter,
    //pageable: true,
    // autoheight: true,
    sortable: true,
    altrows: true,
    enabletooltips: true,
    editable: false,
    selectionmode: 'singlerow', //' 'multiplecellsadvanced',
    autoshowloadelement: true,
    columnsresize: true,

    columns:
      [
        {text: 'Id', datafield: 'IdStud', width: '10%', hidden: false},
        {text: 'Code', datafield: 'Code', width: '20%'},
        {text: 'First name', datafield: 'FirstName', width: '30%'},
        {text: 'Last Name', datafield: 'LastName', width: '40%'}
      ]
  };

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private dbService: DbService,
    private router: Router,
    // private messageService: MessageComponentsService,
    public selectedStudent: Student,
    public dekl: Dekl,
    public tdummy: Dummy,
    public tstdnt: Student,
    private dbmongoService: DbmongoService,
    private http: HttpClient
  ) {
  }

  @ViewChild('myGrid') myGrid: jqxGridComponent;

  ngOnInit() {
    //alert('ulogovan je ' + this.dekl.ulogovan);

    if (this.dekl.ulogovan === false) {

      // if (this.storage.get('member_name') ===  null) {
      this.router.navigate(['notlogged']);
      return;
    }

    this.checkStatus = false;

    this.ttImeMdb = this.storage.get('ime_mdb');

    this.trefreshgrid = 'ništa još';
    this.generate3();

    if (this.globv.PONISTI === false) {
      this.upgrade();
      this.globv.PONISTI = true;
      this.globv.NOVI = false;
    } else {
      if (this.globv.NOVI === true) {
        // alert ('brisi redak');
        // this.brisiRed();
        const noviiidstud = Number(this.globv.noviidstud) + 1;

        // const noviiidstud2 = noviiidstud.toString();
        // this.dbService.brisiStudenta(noviiidstud)
        this.dbmongoService.brisiStudenta(this.globv.tIMEMDB, noviiidstud)
          .subscribe(data => {
            this.refreshgrid();

            this.tdata = data;
            this.tdummy.tekst1 = this.tdata[0].tekst1;
            this.tdummy.tekst2 = this.tdata[0].tekst2;

            if (this.tdummy.tekst1 === 'Error') {
              alert('Error :' + this.tdummy.tekst2);
              return;
            } else {
              this.globv.trowind = Number(this.globv.trowind) - 1;
              this.globv.tselind = Number(this.globv.tselind) - 1;
              this.myGrid.selectrow(this.globv.trowind);
              this.myGrid.ensurerowvisible(this.globv.trowind);

              // alert('broj:' + this.tdummy.broj1 + '    dodano:' + this.tdummy.tekst1);
            }
          });
        this.globv.NOVI = false;
      }
    }

    if (this.dekl.StudentPONISTI === false) {
      // alert('StudentPONISTI = false');

      this.upgrade2();
    }
  }

  ngAfterViewInit(): void {
    this.myGrid.createWidget(this.settings);

    // this.myGrid.selectrow(0);
    this.globv.globalVar1 = 503;

    this.globv.YES = false;

    this.myGrid.showloadelement();
  }


  public generate3(): any {

    this.dbmongoService.getStudents(this.ttImeMdb)
      .subscribe(data => {
        let datagStudentiGrid = [];

        // this.rows = [];
        // const rowsn = [...this.rows, ...data];
        // this.rows = rowsn;
        // const string = JSON.stringify(rowsn);
        // const a = 0;
        //
        // const c = 0;

        this.tdata = data;
        let i = 0;

        $.map(this.tdata, function (item) {
          // Map(this.tdata, function (item) {
          let row = {};
          row[0] = item.IdStud;
          row[1] = item.Code;
          row[2] = item.FirstName;
          row[3] = item.LastName;

          datagStudentiGrid[i] = row;
          i = i + 1;
        });

        this.data = datagStudentiGrid;

        this.tsource.localdata = this.data;
        this.myGrid.source = this.tsource;
        this.myGrid.updatebounddata();

      });
  }

  Bindingcomplete(event: any): void {
    // Do Something
    // alert('Bindingcomplete');
    // this.myGrid.selectrow(0);
    this.myGrid.selectrow(this.tselectedindex);
    this.myGrid.ensurerowvisible(this.tselectedindex);

    // this.tWaitHdn = true;
  }

  otvori() {
    this.globv.NOVI = false;
    let trind = this.myGrid.getselectedrowindex();

    let dataRecord = this.myGrid.getrowdata(trind);
    const tidbroj = dataRecord.IdStud;
    this.globv.tidstud = dataRecord.IdStud;

    //this.upgrade2();
    this.dajStudenta(trind, tidbroj);
  }

  public dajStudenta(rowindex, tidbroj): any {

    if (rowindex === -1) {
      return;
    }

    // this.globv.NOVI = true;

    this.globv.tselind = rowindex;

    this.dbmongoService.uzmiStudenta(tidbroj, this.globv.tIMEMDB)
      .subscribe(data => {
        this.tdata = data;

        this.tstdnt.id = this.tdata[0]._id;
        this.tstdnt.IdStud = this.tdata[0].IdStud;
        // this.tstdnt.Code = this.tdata[0].Code;
        if (this.tdata[0].Code === null || this.tdata[0].Code === undefined || this.tdata[0].Code === 'undefined') {
          this.tstdnt.Code = '';
        } else {
          this.tstdnt.Code = this.tdata[0].Code;
        }
        this.tstdnt.FirstName = this.tdata[0].FirstName;
        this.tstdnt.LastName = this.tdata[0].LastName;

        // this.tstdnt.EnrDate = this.tdata[0].EnrDate;
        if (this.tdata[0].EnrDate === null || this.tdata[0].EnrDate === undefined || this.tdata[0].EnrDate === 'undefined') {
          this.tstdnt.EnrDate = '';
        } else {
          this.tstdnt.EnrDate = this.tdata[0].EnrDate;
        }

        // this.tstdnt.Email = this.tdata[0].Email;
        if (this.tdata[0].Email === null || this.tdata[0].Email === undefined || this.tdata[0].Email === 'undefined') {
          this.tstdnt.Email = '';
        } else {
          this.tstdnt.Email = this.tdata[0].Email;
        }

        if (this.tdata[0].Address === null || this.tdata[0].Address === undefined || this.tdata[0].Address === 'undefined') {
          this.tstdnt.Address = '';
        } else {
          this.tstdnt.Address = this.tdata[0].Address;
        }
        if (this.tdata[0].Age === null || this.tdata[0].Age === undefined || this.tdata[0].Age === 'undefined') {
          this.tstdnt.Age = '0';
        } else {
          this.tstdnt.Age = this.tdata[0].Age;
        }


        this.router.navigate(['/tstudent']);
      });

  }

  novi() {
    if (this.globv.tIMEMDB === 'AdcUniversity100') {
      this.tmessage = 'This is a demo database.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.globv.NOVI = true;
    this.dodajStudenta();
  }


  upgrade(): any {
    const rowindex = this.globv.tselind;
    if (rowindex === -1) {
      return;
    }
    // const dataRecord = this.myChild.myGrid.getrowdata(rowindex);
    // const tIdStud = dataRecord.IdStud;
    const tIdStud = this.globv.tidstud;

    if (typeof (this.tstdnt.Code) === 'undefined') {
      this.tstdnt.Code = '_';
    }
    // if (typeof (this.tstdnt.FirstName) === 'undefined') {this.tstdnt.FirstName = '_';}
    // if (typeof (this.tstdnt.LastName) === 'undefined') {this.tstdnt.LastName = '_';

    this.dbmongoService.updejtajStudenta(tIdStud, this.tstdnt.Code, this.tstdnt.LastName, this.tstdnt.FirstName, this.tstdnt.Address, this.tstdnt.Email, Number(this.tstdnt.Age), this.tstdnt.EnrDate, this.globv.tIMEMDB)
      .subscribe(data => {

        this.refreshgrid();

        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;
        //this.tdummy.tekst2 =  this.tdata[0].tekst2;

        const a = this.tdummy.tekst1;
        // b = this.tdummy.tekst2;
        if (a === 'greska') {
          alert('error with database');
        }
        if (a === 'ok') {
          // alert('update ok');
        }
      });
  }

  upgrade2st(): any {
    // alert('upgrade2');

    this.dbmongoService.updejtajStudenta2( this.globv.tIMEMDB)
      .subscribe(data => {

        this.refreshgrid();

        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;

        const a = this.tdummy.tekst1;
        // b = this.tdummy.tekst2;
        if (a === 'greska') {
          alert('error with database');
        }
        if (a === 'ok') {
          // alert('update ok');
        }
      });

  }

  upgrade2(): any {
    // alert('upgrade2');

    this.dbmongoService.updejtajRedak(this.selectedStudent, this.globv.tIMEMDB, 'yy', this.selectedStudent.id)
      .subscribe(data => {

        this.refreshgrid();

        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;

        const a = this.tdummy.tekst1;
        // b = this.tdummy.tekst2;
        if (a === 'greska') {
          alert('error with database');
        }
        if (a === 'ok') {
          // alert('update ok');
        }
      });

  }


  // upgrade2(): any {
  //   //test
  //   this.http.get('http://' + 'localhost' + ':4001/studenti/update2/AdcUniversity2/2', {responseType: 'text'})
  //     .subscribe((data) => {
  //
  //       alert(data.toString() + 'ff');
  //     });
  // }

  public dodajStudenta(): any {

    this.dbmongoService.dajMaksIdStud(this.ttImeMdb)
      .subscribe(data => {

        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;
        this.tdummy.tekst2 = this.tdata[0].tekst2;
        this.tdummy.broj1 = this.tdata[0].broj1;
        //this.tdummy.broj2 = this.tdata[0].broj2;
        //this.tdummy.tekst2 =  this.tdata[0].tekst2;

        const a = this.tdummy.tekst1;
        const a1 = this.tdummy.tekst2;
        const b = this.tdummy.broj1;
        const b1 = this.tdummy.broj2;

        if (this.tdummy.tekst1 === 'Error') {
          alert('Error :' + this.tdummy.tekst2);
          return;
        } else {
          // alert('MaxIdStud:' + this.tdummy.broj1);
          this.IzrCount();
        }

      });
  }

  public IzrCount(): any {
    if (this.tdummy.tekst1 === 'Error') {
      alert('Error :' + this.tdummy.tekst2);
      return;
    } else {

      this.dbmongoService.dajCountStud(this.globv.tIMEMDB)
        .subscribe(data => {
          this.tdata = data;
          this.tdummy.tekst1 = this.tdata[0].tekst1;
          this.tdummy.tekst2 = this.tdata[0].tekst2;
          this.tdummy.broj2 = this.tdata[0].broj2;

          const a = this.tdummy.tekst1;
          const a1 = this.tdummy.tekst2;
          const b = this.tdummy.broj1;
          const b1 = this.tdummy.broj2;

          if (this.tdummy.tekst1 === 'Error') {
            alert('Error :' + this.tdummy.tekst2);
            return;
          } else {
            // alert('count:' + this.tdummy.broj2 + '    MaxIdStud:' + this.tdummy.broj1);
            this.globv.noviidstud = this.tdummy.broj1;
            this.globv.trowind = this.tdummy.broj2;
            this.globv.tselind = Number(this.tdummy.broj2) + 1;
            this.globv.tidstud = Number(this.tdummy.broj1) + 1;
            this.pridodajStudenta();
          }

        });

    }


  }

  public pridodajStudenta(): any {

    const noviStud = this.globv.noviidstud + 1;

    if (this.tdummy.tekst1 === 'Error') {
      alert('Error :' + this.tdummy.tekst2);
      return;
    } else {

      this.dbmongoService.dodajStudentaUBazu(this.globv.tIMEMDB, noviStud)
        .subscribe(data => {
          this.refreshgrid();

          this.tdata = data;
          this.tdummy.tekst1 = this.tdata[0].tekst1;
          this.tdummy.tekst2 = this.tdata[0].tekst2;
          this.tdummy.broj1 = this.tdata[0].broj1;
          // this.tdummy.broj2 = this.tdata[0].broj2;
          //this.tdummy.tekst2 =  this.tdata[0].tekst2;

          const a = this.tdummy.tekst1;
          // const a1 = this.tdummy.tekst2;
          const b = this.tdummy.broj1;

          if (this.tdummy.tekst1 === 'Error') {
            alert('Error :' + this.tdummy.tekst2);
            return;
          } else {
            // alert('broj:' + this.tdummy.broj1 + '    dodano:' + this.tdummy.tekst1);
          }

          let noviiidstud = Number(this.globv.noviidstud) + 1;

          this.myGrid.selectrow(this.globv.trowind);
          this.myGrid.ensurerowvisible(this.globv.trowind);
          this.dajStudenta(this.globv.trowind, noviiidstud);

        });
    }
  }

  public brisiRed(): any {
    if (this.globv.tIMEMDB === 'AdcUniversity100') {
      this.tmessage = 'This is a demo database.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.tmessage = 'Are you sure?';
    this.areyousureWindow.position('center');
    this.areyousureWindow.open();
  }

  public obrisiRed(): any {
    let rowindex = this.myGrid.getselectedrowindex();
    if (rowindex === -1) {
      return;
    }

    this.globv.tselind = rowindex;

    let dataRecord = this.myGrid.getrowdata(rowindex);
    const tidbroj = dataRecord.IdStud;
    this.globv.tidstud = dataRecord.IdStud;

    // alert('brisem' + tidbroj);

    this.dbmongoService.brisiStudenta(this.globv.tIMEMDB, tidbroj)
      .subscribe(data => {
        this.refreshgrid();

        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;
        this.tdummy.tekst2 = this.tdata[0].tekst2;

        if (this.tdummy.tekst1 === 'Error') {
          alert('Error :' + this.tdummy.tekst2);
          return;
        } else {
          this.globv.trowind = Number(this.globv.trowind) - 1;
          this.globv.tselind = Number(this.globv.tselind) - 1;
          // this.myGrid.selectrow(this.globv.trowind );
          this.tselectedindex = this.globv.tselind;
          // alert('broj:' + this.tdummy.broj1 + '    dodano:' + this.tdummy.tekst1);
        }
      });

  }

  refreshgrid() {
    this.generate3();
  }

  closeYes(): void {
    this.globv.YES = true;
    this.areyousureWindow.close();

    this.obrisiRed();

    let tekIdStudStr = '';
    const ttid = this.globv.tidstud.toString();
    if (ttid.length === 1) {
      tekIdStudStr = '00' + ttid;
    }
    if (ttid.length === 2) {
      tekIdStudStr = '0' + ttid;
    }
    if (ttid.length === 3) {
      tekIdStudStr = ttid;
    }

    const tfilepic = 'Photo' + tekIdStudStr + '.jpg';
    this.dbService.brisisliku(this.globv.tSlikeDir, tfilepic);
  }

  closeNo(): void {
    this.globv.YES = false;
    this.areyousureWindow.close();
  }

  brisisliku(): void {
    this.dbService.brisisliku('UploadedImages3', 'aa.txt');

  }

  doIfChecked(): void {

    if (!this.checkStatus) {
      //alert("checked");
      // $scope.jqxgridExamsSettings.apply('filterable', 'true');
      // $scope.jqxgridExamsSettings.apply('showfilterrow', 'true');
      //$('#jqxgridStudenti').jqxGrid({ filterable: true });
      //$('#jqxgridStudenti').jqxGrid({ showfilterrow: true });
      this.myGrid.filterable(true);
      this.myGrid.showfilterrow(true);
    }
    else {
      //alert("unchecked");
      // $scope.jqxgridExamsSettings.apply('showfilterrow', 'false');
      // $scope.jqxgridExamsSettings.apply('filterable', 'false');

      //$('#jqxgridStudenti').jqxGrid({ filterable: false });
      //$('#jqxgridStudenti').jqxGrid({ showfilterrow: true });

      this.myGrid.filterable(false);
      this.myGrid.showfilterrow(false);
    }
  }

  closeMessage(): void {
    this.messageWindow.close();

  }

  Rowselect(tevent): void {

  }

  otvoridialog() {
    alert('otvori dialog');

    this.studentWindow.position('center');
    this.studentWindow.open();
  }

  closeDialog(): void {
    this.studentWindow.close();
  }

  parentFun() {
    alert('parent component function. jeeeee');

  }


  otvori2() {
    this.globv.NOVI = false;
    let trind = this.myGrid.getselectedrowindex();

    let dataRecord = this.myGrid.getrowdata(trind);
    const tidbroj = dataRecord.IdStud;
    this.globv.tidstud = dataRecord.IdStud;

    this.dajStudenta2(trind, tidbroj);

    // this.router.navigate(['/tstudent2']);
  }

  public dajStudenta2(rowindex, tidbroj): any {

    if (rowindex === -1) {
      return;
    }

    // this.globv.NOVI = true;

    this.globv.tselind = rowindex;

    this.dbmongoService.uzmiStudenta(tidbroj, this.globv.tIMEMDB)
      .subscribe(data => {
        this.tdata = data;

        this.tstdnt.IdStud = this.tdata[0].IdStud;
        this.tstdnt.id = this.tdata[0]._id;
        // this.tstdnt.Code = this.tdata[0].Code;
        if (this.tdata[0].Code === null || this.tdata[0].Code === undefined || this.tdata[0].Code === 'undefined') {
          this.tstdnt.Code = '';
        } else {
          this.tstdnt.Code = this.tdata[0].Code;
        }
        this.tstdnt.FirstName = this.tdata[0].FirstName;
        this.tstdnt.LastName = this.tdata[0].LastName;


        this.router.navigate(['/tstudent2']);
      });
  }
}


