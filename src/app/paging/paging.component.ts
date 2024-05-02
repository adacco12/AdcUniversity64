import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';


import { Student } from '../student.service';
import { DbService } from '../db.service';
import { DbmongoService } from '../dbmongo.service';
import { environment } from '../../environments/environment';

import {Dekl} from '../dekl.service';
import {Dummy} from '../dummy.service';
import {Subscription} from 'rxjs';

import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {jqxWindowComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})


export class PagingComponent implements AfterViewInit {
  public checkStatus: boolean;

  globv = environment;

  tdata: any;
  trefreshgrid: string;
  // public tselectedindex = 0;
  public tselectedindex = this.globv.tselind;
  tekCColumnOrderStudentsGrid = 'IdStud';

  tWaitHdn = false;

  public tpozdrav: string = 'dobar dan';
  tmessage = 'Dobro jutro jedan dva tri pet sest sedam osam devet';

  public tstind = '0';
  public tendind = '16';
  // public tendind = '6';

  public tpagingdata = '25 of 100 000'

  public totalrecords = 0;
  public tpagerows = 16;
  // public tpagerows = 6;
  public totalpages = 0;
  public curpage = 0;

  @ViewChild('areyousureWindow') areyousureWindow: jqxWindowComponent;
  @ViewChild('messageWindow') messageWindow: jqxWindowComponent;

  data: any[];

  public ttImeMdb = 'AdcUniversity';

  customsortfunc = (column: any, direction: string | boolean): void => {
    let tekColumnStudentiGrid = column;
    let tdirectionStudentiGrid = ' ASC';

    if (direction === 'true') {
      tdirectionStudentiGrid = ' ASC';
    }
    if (direction === 'false') {
      tdirectionStudentiGrid = ' DESC';
    }
    if (direction === 'descending') {
      tdirectionStudentiGrid = ' DESC';
    }
    if (direction === null) {
      tekColumnStudentiGrid = 'IdStud';
      tdirectionStudentiGrid = ' ASC';
    }

    this.tekCColumnOrderStudentsGrid = tekColumnStudentiGrid + tdirectionStudentiGrid; //  'Trajanje'; //  'IdbClana';
    this.myGrid.updatebounddata('sort');

    this.first();
  }

  tsource: any =
    {
      localdata: this.data,
      sort: this.customsortfunc,
      datafields:
        [
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
    height:'calc(100% - 112px)',
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
    private dbmongoService: DbmongoService,
    private router: Router,
    public selectedStudent: Student,
    public dekl: Dekl,
    public tdummy: Dummy,
    public tstdnt: Student
  ) { }

  @ViewChild('myGrid') myGrid: jqxGridComponent;

  ngOnInit() {
    // if ( this.dekl.ulogovan === false) {

    if (this.storage.get('member_name') ===  null) {
      this.router.navigate(['notlogged']);
      return;
    }

    this.checkStatus = false;

    this.ttImeMdb = this.storage.get('ime_mdb');
    this.totalrecords = this.ukbroj();

    this.totalpages = this.totalrecords / this.tpagerows;
    // rount to lowest integer
    let tot = Math.floor( this.totalpages);
    // let tot = this.totalpages.toFixed(0);
    // this.totalpages = parseInt(tot, 10);
    this.totalpages = tot;

    let ostatak = this.totalrecords % this.tpagerows;
    if (ostatak > 0) {this.totalpages = this.totalpages + 1; }

    if (this.globv.DIALOGZATVOREN === false) {
      this.globv.gtstind = '0';
      this.globv.gtendind = '16';
      // this.globv.gtendind = '6';
    }

    let tekstr = this.curpage + 1;
    let ukkstr = this.totalpages;
    this.tpagingdata = tekstr + ' of ' + ukkstr;

    this.trefreshgrid = 'ništa još';
    this.generate3(this.globv.gtstind, this.globv.gtendind);

    if (this.globv.PONISTI === false) {
      this.upgrade();
      this.globv.PONISTI = true;
      if (this.globv.NOVI === true) {
        // this.tselectedindex = 3;
        this.last();
        // this.myGrid.selectrow(2 );

        // this.tselectedindex = 2;

        this.totalrecords = this.totalrecords;
        this.totalpages = this.totalrecords / this.tpagerows;
        let tot = Math.floor(this.totalpages);
        this.totalpages = tot;

        this.tselectedindex = (this.totalrecords - tot * this.tpagerows) - 1;

      } else {
        this.tselectedindex = this.globv.tselind;
      }
      this.globv.NOVI = false;

    } else {
      if (this.globv.NOVI === true) {
        // alert ('brisi redak');
        // this.brisiRed();
        const noviiidstud = Number(this.globv.noviidstud) + 1;
        // const noviiidstud2 = noviiidstud.toString();
        this.dbService.brisiStudenta(noviiidstud)
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
              this.myGrid.selectrow(this.globv.trowind );
              this.myGrid.ensurerowvisible(this.globv.trowind);

              // alert('broj:' + this.tdummy.broj1 + '    dodano:' + this.tdummy.tekst1);
            }
          });
        this.globv.NOVI = false;
      } else {
        this.tselectedindex = this.globv.tselind;
        // this.last();
      }
    }
  }

  ngAfterViewInit(): void  {
    this.myGrid.createWidget(this.settings);

    // this.myGrid.selectrow(0);
    this.globv.globalVar1 = 503;

    this.globv.YES = false;

    this.myGrid.showloadelement();

  }

  public generate3(tst: string, tend: string): any {

    // this.dbService.getStudents(this.globv.tIMEMDB)
    this.dbmongoService.getStudentsPage(this.ttImeMdb, tst, tend, this.tekCColumnOrderStudentsGrid, 'xx' )
      .subscribe(data => {
        let datagStudentiGrid = [];

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


  Bindingcomplete(event: any): void   {
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

    // this.globv.gtstind = this.tstind;
    // this.globv.gtendind = this.tendind;

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

        this.tstdnt.IdStud = this.tdata[0].IdStud;
        // this.tstdnt.Code = this.tdata[0].Code;
        if (this.tdata[0].Code  === null || this.tdata[0].Code  === undefined || this.tdata[0].Code  === 'undefined') {
          this.tstdnt.Code = '';
        } else {
          this.tstdnt.Code = this.tdata[0].Code;
        }
        this.tstdnt.FirstName = this.tdata[0].FirstName;
        this.tstdnt.LastName = this.tdata[0].LastName;

        // this.tstdnt.EnrDate = this.tdata[0].EnrDate;
        if (this.tdata[0].EnrDate  === null || this.tdata[0].EnrDate  === undefined || this.tdata[0].EnrDate  === 'undefined') {
          this.tstdnt.EnrDate = '';
        } else {
          this.tstdnt.EnrDate = this.tdata[0].EnrDate;
        }

        // this.tstdnt.Email = this.tdata[0].Email;
        if (this.tdata[0].Email  === null || this.tdata[0].Email  === undefined || this.tdata[0].Email  === 'undefined') {
          this.tstdnt.Email = '';
        } else {
          this.tstdnt.Email = this.tdata[0].Email;
        }

        if (this.tdata[0].Address  === null || this.tdata[0].Address  === undefined || this.tdata[0].Address  === 'undefined') {
          this.tstdnt.Address = '';
        } else {
          this.tstdnt.Address = this.tdata[0].Address;
        }
        if (this.tdata[0].Age  === null || this.tdata[0].Age  === undefined || this.tdata[0].Age  === 'undefined') {
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

    // this.dbService.updejtajStudenta(tIdStud, this.tstdnt.Code, this.tstdnt.LastName, this.tstdnt.FirstName, this.tstdnt.Address, this.tstdnt.Email, Number(this.tstdnt.Age), this.tstdnt.EnrDate)
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

    const noviStud = this.globv.noviidstud +1;

    if ( this.tdummy.tekst1 === 'Error') {
      alert ('Error :' + this.tdummy.tekst2);
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

          // this.myGrid.selectrow(this.globv.trowind);
          // this.myGrid.ensurerowvisible(this.globv.trowind);
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
    // this.generate3(this.tstind, this.tendind);
    this.generate3(this.globv.gtstind, this.globv.gtendind);
  }

  closeYes(): void {
    this.globv.YES = true;
    this.areyousureWindow.close();

    this.obrisiRed();

    let tekIdStudStr = '';
    const ttid = this.globv.tidstud.toString();
    if (ttid.length === 1) {tekIdStudStr = '00' + ttid ; }
    if (ttid.length === 2) {tekIdStudStr = '0' + ttid; }
    if (ttid.length === 3) {tekIdStudStr = ttid; }

    const tfilepic = 'Photo' + tekIdStudStr  + '.jpg';
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

    if (!this.checkStatus ) {
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

  Rowselect  (tevent): void {
  }

  next(): void {
    // alert('nnext');

    this.curpage =  this.curpage + 1;
    if (this.curpage  >= this.totalpages) {
      this.curpage = this.totalpages - 1;
      return; }

    let tst = this.curpage * this.tpagerows;
    let ten = tst + 16;
    // let ten = tst + 6;
    this. globv.gtstind = tst.toString();
    this.globv.gtendind = ten.toString();
    // this.generate3('5', '10');
    // this.generate3(this.tstind, this.tendind);
    this.generate3(this.globv.gtstind, this.globv.gtendind);

    let tekstr = this.curpage + 1;
    let ukkstr = this.totalpages;
    this.tpagingdata = tekstr + ' of ' + ukkstr;
  }

  first(): void {
    this.curpage = 0;
    this.globv.gtstind = '0';
    this.globv.gtendind = '16';
    // this.globv.gtendind = '6';
    this.generate3(this.globv.gtstind, this.globv.gtendind);

    let tekstr = this.curpage + 1;
    let ukkstr = this.totalpages;
    this.tpagingdata = tekstr + ' of ' + ukkstr;
  }


  prev(): void {

    this.curpage =  this.curpage - 1;
    if (this.curpage <= -1) {
      this.curpage = 0;
      return; }

    let tst = this.curpage * this.tpagerows;
    let ten = tst + 16;
    // let ten = tst + 6;
    this.globv.gtstind = tst.toString();
    this.globv.gtendind = ten.toString();
    // this.generate3('5', '10');
    // this.generate3(this.tstind, this.tendind);
    this.generate3(this.globv.gtstind, this.globv.gtendind);

    let tekstr = this.curpage + 1;
    let ukkstr = this.totalpages;
    this.tpagingdata = tekstr + ' of ' + ukkstr;
  }

  last(): void {
    this.curpage = this.totalpages - 1;

    let tst = this.curpage * this.tpagerows;
    let ten = tst + 16;
    // let ten = tst + 6;
    this. globv.gtstind = tst.toString();
    this.globv.gtendind = ten.toString();
    this.generate3(this.globv.gtstind, this.globv.gtendind);

    let tekstr = this.curpage + 1;
    let ukkstr = this.totalpages;
    this.tpagingdata = tekstr + ' of ' + ukkstr;
  }

  ukbroj(): any {
    const a = this.DajUkbr();
    const uk = a[0].count;
    return uk;
  }


  DajUkbr(): any[] {
    let i = 0;
    let ukPodaci = [];

    let turl = 'http://' + this.globv.THOST + ':4001/studenti/getCountN/';
    turl = turl  + this.globv.tIMEMDB;
    $.ajax({
      url: turl,
      data: {},
      cache: false,
      timeout: 5000,
      async: false,
      success: function (data) {
        $.map(data, function (item) {
          let row = {};
          row['odg'] = item.tekst1;
          row['count'] = item.broj2;

          if (item.tekst1 !== 'Error') {
            ukPodaci[i] = row;
            this.data[i] = row;
          } else {
            alert('Error: ' + item.tekst2);
          }
          const q = 0;
          i = i + 1;
        });
        const a = 0;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert('error -01 - ' + textStatus + ' ' + errorThrown);
      }
    })
    return ukPodaci;
  }

  Refresh(): void {
    alert('refresh');
    this.myGrid.selectrow(5 );
    this.myGrid.ensurerowvisible(5);
  }
}

