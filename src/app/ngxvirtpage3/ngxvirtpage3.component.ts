import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Page} from '../model/page';
import {PagedServiceService} from '../paged-service.service';
import {Cstudent} from '../model/cstudent';
import { DbService } from '../db.service';
import * as $ from 'jquery';

import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {environment} from '../../environments/environment';
import {jqxWindowComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';
import {Dekl} from '../dekl.service';
import {Dummy} from '../dummy.service';
import {Student} from '../student.service';
import {Router} from '@angular/router';

import { DbmongoService } from '../dbmongo.service';
import {PagedMongoService} from '../paged-mongo.service';

@Component({
  selector: 'app-ngxvirtpage3',
  templateUrl: './ngxvirtpage3.component.html',
  styleUrls: ['./ngxvirtpage3.component.css']
})
export class Ngxvirtpage3Component implements OnInit {

  isLoading: boolean;
  tdata: any;
  globv = environment;
  public ttImeMdb = 'AdcUniversity2';
  public tSlikeDir = 'UploadedImages';

  page = new Page();
  rows = new Array<Cstudent>();
  cache: any = {};

  checkStatus = false;
  public tselectedindex = this.globv.tselind;

  tmessage = 'Dobro jutro jedan dva tri pet sest sedam osam devet';
  @ViewChild('areyousureWindow') areyousureWindow: jqxWindowComponent;
  @ViewChild('messageWindow') messageWindow: jqxWindowComponent;

  public totalrecords = 0;
  public tpagerows = 5;
  public totalpages = 0;
  public curpage = 0;


  columns = [
    {name: 'Id', prop: 'IdStud'},
    {name: 'Code', prop: 'Code'},
    {name: 'First name', prop: 'FirstName'},
    {name: 'Last Name', prop: 'LastName', sortable: false},
    {name: 'Address', prop: 'Address'},
    {name: 'Email', prop: 'Email'},
    {name: 'Age', prop: 'Age'},
    {name: 'EnrDate', prop: 'EnrDate'}

  ];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
              private serverResultsService: PagedMongoService,
              private dbService: DbService,
              private dbmongoService: DbmongoService,
              private router: Router,
              public dekl: Dekl,
              public tdummy: Dummy,
              public tstdnt: Student  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;

  }

  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page, this.ttImeMdb).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;

      for (let i = 0 ; i < this.rows.length ; i++) {
        // check for a match
        let tekIdStud = this.rows[i].IdStud.toString();
        if (tekIdStud === null) { tekIdStud = ''; }

        let tekIdStudStr = '';
        if (tekIdStud.length === 1) { tekIdStudStr = '00' + tekIdStud }
        if (tekIdStud.length === 2) { tekIdStudStr = '0' + tekIdStud }
        if (tekIdStud.length === 3) { tekIdStudStr = tekIdStud }
        let tadresaSlike = 'http://www.siteknower.com/' + this.tSlikeDir + '/Photo' + tekIdStudStr + '.jpg';

        this.rows[i].AdresaSlike = tadresaSlike;
      }

      const a = 0;
    });
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.ttImeMdb = this.storage.get('ime_mdb');
    this.tSlikeDir = this.globv.tSlikeDir;


    this.totalrecords = this.ukbroj();

    this.totalpages = this.totalrecords / this.tpagerows;
    // rount to lowest integer
    let tot = Math.floor( this.totalpages);
    // let tot = this.totalpages.toFixed(0);
    // this.totalpages = parseInt(tot, 10);
    this.totalpages = tot;

    let ostatak = this.totalrecords % this.tpagerows;
    if (ostatak > 0) {this.totalpages = this.totalpages + 1; }

    this.checkStatus = false;

    if (this.globv.PONISTI === false) {
      this.upgrade();
      this.globv.PONISTI = true;

      if (this.globv.NOVI === true) {
        // this.last();

        /////////
        this.totalrecords = this.ukbroj();
        this.totalpages = this.totalrecords / this.tpagerows;
        let tot = Math.floor( this.totalpages);
        this.totalpages = tot;
        let ostatak = this.totalrecords % this.tpagerows;
        if (ostatak > 0) {this.totalpages = this.totalpages + 1; }
        //////////

        this.page.pageNumber = this.totalpages - 1 ;
        this.page.totalPages = this.totalpages ;
        this.page.totalElements =  this.totalrecords  ;
        this.setPage({ offset: this.totalpages - 1  });


      } else {
        this.page.pageNumber = this.globv.toffset ;
        this.setPage({ offset: this.globv.toffset  });

      }
      this.globv.NOVI = false;

    } else {
      if (this.globv.NOVI === true) {
        // alert ('brisi redak');
        // this.brisiRed();
        const noviiidstud = Number(this.globv.noviidstud) + 1;
        // const noviiidstud2 = noviiidstud.toString();
        this.dbmongoService.brisiStudenta(this.globv.tIMEMDB, noviiidstud)
          .subscribe(data => {
            // this.refreshgrid();
            this.updateTable()

            this.tdata = data;
            this.tdummy.tekst1 = this.tdata[0].tekst1;
            this.tdummy.tekst2 = this.tdata[0].tekst2;

            if (this.tdummy.tekst1 === 'Error') {
              alert('Error :' + this.tdummy.tekst2);
              return;
            } else {
            }
          });
        this.globv.NOVI = false;
        this.setPage({ offset: 0 });
      } else {
        // this.tIdStud = this.globv.tidstud;
        this.page.pageNumber = this.globv.toffset ;
        this.setPage({ offset: this.globv.toffset  });
      }
    }

  }

  otvori(): void {
    // alert('otvori');
    this.updateTable();
  }

  updateTable() {
    // this.rows[0].Code = '261';
    this.rows = [...this.rows];
  }

  // aopen(tIdStud): void {
  //   alert('aopen' + tIdStud);
  //   // this.updateTable();
  // }

  public aopen(tidbroj): any {
    this.globv.NOVI = false;
    //
    // let dataRecord = this.myGrid.getrowdata(trind);
    this.globv.tidstud = tidbroj ;
    this.globv.toffset = this.page.pageNumber;


    this.dbmongoService.uzmiStudenta(tidbroj, this.globv.tIMEMDB)
      .subscribe(data => {
        this.tdata = data;

        this.tstdnt.IdStud = this.tdata[0].IdStud;
        this.tstdnt.Code = this.tdata[0].Code;
        this.tstdnt.FirstName = this.tdata[0].FirstName;
        this.tstdnt.LastName = this.tdata[0].LastName;

        this.tstdnt.EnrDate = this.tdata[0].EnrDate;
        this.tstdnt.Email = this.tdata[0].Email;
        this.tstdnt.Address = this.tdata[0].Address;
        this.tstdnt.Age = this.tdata[0].Age;

        this.router.navigate(['/tstudent']);
      });

  }

  public adelete(tidbroj): any {
    // alert('adelete ' + tidbroj);
    if (this.globv.tIMEMDB === 'AdcUniversity100') {
      this.tmessage = 'This is a demo database.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.globv.tidstud = tidbroj;

    this.tmessage = 'Are you sure?';
    this.areyousureWindow.position('center');
    this.areyousureWindow.open();

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

        // let datagStudentiGrid = [];

        //this.generate3();
        this.tdata = data;

        // const rowsn = [...this.rows, ...data];
        // this.rows = rowsn;
        // this.isLoading = false;

        // this.updateTable();

        this.tdummy.tekst1 = this.tdata[0].tekst1;

        const a = this.tdummy.tekst1;
        // b = this.tdummy.tekst2;
        if (a === 'greska') {
          alert('error with database');
        }
        if (a === 'ok') {
          // alert('update ok');
          // this.tstdnt.Code = this.tdata[0].Code;
          this.rows[this.tselectedindex].IdStud = Number(this.tstdnt.Code);
          this.rows[this.tselectedindex].FirstName = this.tstdnt.FirstName;
          this.rows[this.tselectedindex].LastName = this.tstdnt.LastName;

        }
        // this.tIdStud = this.tstdnt.IdStud;
        // this.globv.tidstud = this.tIdStud;
      });
  }

  public obrisiRed(): any {
    this.globv.toffset = this.page.pageNumber;

    const tidbroj = this.globv.tidstud;

    // alert('brisem' + tidbroj);

    this.dbmongoService.brisiStudenta(this.globv.tIMEMDB, tidbroj)
      .subscribe(data => {
        // this.Refresh();
        // this.generate3();

        // this.setPage({ offset: 0 });

        this.page.pageNumber = this.globv.toffset ;
        this.setPage({ offset: this.globv.toffset  });

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
          this.globv.toffset = this.page.pageNumber;


        }
      });

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
    // this.dbService.brisisliku(this.globv.tSlikeDir, tfilepic);
  }

  closeNo(): void {
    this.globv.YES = false;
    this.areyousureWindow.close();
  }

  brisisliku(): void {
    this.dbService.brisisliku('UploadedImages3', 'aa.txt');

  }
  closeMessage(): void {
    this.messageWindow.close();

  }

  anew() {
    if (this.globv.tIMEMDB === 'AdcUniversity100') {
      this.tmessage = 'This is a demo database.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.globv.prethscrollpos = this.globv.tscrollpos;
    // this.globv.prethrowind = this.tIdStud;
    // this.globv.trowind;

    this.globv.NOVI = true;
    this.dodajStudenta();
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

    const noviStud = this.globv.noviidstud;

    if ( this.tdummy.tekst1 === 'Error') {
      alert ('Error :' + this.tdummy.tekst2);
      return;
    } else {

      this.dbmongoService.dodajStudentaUBazu(this.globv.tIMEMDB, noviStud)
        .subscribe(data => {
          // this.refreshgrid();
          // this.generate3();

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

          // this.selected = [this.rows[this.globv.trowind]];

          // let bb =  this.table.element.getElementsByTagName('datatable-body')[0].bodyHeight;
          let aa = 500000;
          this.globv.tscrollpos =  aa;

          this.dajStudenta(this.globv.trowind, noviiidstud);

        });
    }
  }

  public dajStudenta(rowindex, tidbroj): any {

    if (rowindex === -1) {
      return;
    }

    // this.globv.NOVI = true;

    this.globv.tselind = rowindex;
    this.globv.toffset = this.page.pageNumber;

    this.dbmongoService.uzmiStudenta(tidbroj, this.globv.tIMEMDB)
      .subscribe(data => {
        this.tdata = data;

        this.tstdnt.IdStud = this.tdata[0].IdStud;
        this.tstdnt.Code = this.tdata[0].Code;
        this.tstdnt.FirstName = this.tdata[0].FirstName;
        this.tstdnt.LastName = this.tdata[0].LastName;

        this.tstdnt.EnrDate = this.tdata[0].EnrDate;
        this.tstdnt.Email = this.tdata[0].Email;
        this.tstdnt.Address = this.tdata[0].Address;
        this.tstdnt.Age = this.tdata[0].Age;

        this.router.navigate(['/tstudent']);
      });

  }


  ukbroj(): any {
    const a = this.DajUkbr(this.ttImeMdb);
    const uk = a[0].count;
    return uk;
  }

  DajUkbr(tdatabase: string): any[] {
    let UrlgetCountN = 'http://' + this.globv.THOST + ':4001/studenti/getCountN/';
    let turl = `${UrlgetCountN}`;
    turl = turl  + tdatabase;

    let i = 0;
    let ukPodaci = [];
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
      error : function (jqXHR, textStatus, errorThrown) {
        alert('error -01 - ' + textStatus + ' ' + errorThrown);
      }
    })
    return ukPodaci;
  }
}

