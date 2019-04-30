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

@Component({
  selector: 'app-ngxvirtpage',
  templateUrl: './ngxvirtpage.component.html',
  styleUrls: ['./ngxvirtpage.component.css']
})
export class NgxvirtpageComponent implements OnInit {
  globv = environment;
  isLoading: boolean;

  page = new Page();
  tdata: any;
  rows = new Array<Cstudent>();
  cache: any = {};
  selected = [];
  tIdStud = -1;
  public tselectedindex = this.globv.tselind;
  checkStatus = false;

  tmessage = 'Dobro jutro jedan dva tri pet sest sedam osam devet';
  @ViewChild('areyousureWindow') areyousureWindow: jqxWindowComponent;
  @ViewChild('messageWindow') messageWindow: jqxWindowComponent;

  public totalrecords = 0;
  public tpagerows = 10;
  public totalpages = 0;
  public curpage = 0;

  columns = [
    {name: 'Id', prop: 'IdStud'},
    {name: 'Code', prop: 'Code'},
    {name: 'First name', prop: 'FirstName'},
    {name: 'Last Name', prop: 'LastName', sortable: false}
  ];

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private serverResultsService: PagedServiceService,
    private dbService: DbService,
    public selectedStudent: Student,
    public dekl: Dekl,
    public tdummy: Dummy,
    public tstdnt: Student,
    private router: Router
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;

      this.globv.trowind = Number(this.tselectedindex);
      this.selected = [this.rows[this.globv.trowind]];

      //this.page.pageNumber = this.globv.toffset ;

    });
  }

  ngOnInit() {
    if (this.storage.get('member_name') ===  null) {
      this.router.navigate(['notlogged']);
      return;
    }

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

        this.tselectedindex = (this.totalrecords - tot * this.tpagerows) - 1;
        this.globv.trowind = Number(this.tselectedindex);
        this.selected = [this.rows[this.globv.trowind]];

        this.tIdStud = this.globv.tidstud;

      } else {
        this.tIdStud = this.globv.tidstud;
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
        this.dbService.brisiStudenta(noviiidstud)
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
              // this.globv.trowind = Number(this.globv.trowind) - 1;
              // this.myGrid.selectrow(this.globv.trowind );
              // this.selected = [this.rows[this.globv.trowind]];
              // this.myGrid.ensurerowvisible(this.globv.trowind);

              // alert('broj:' + this.tdummy.broj1 + '    dodano:' + this.tdummy.tekst1);
              if (this.globv.prethrowind !== -1) {
                this.tselectedindex = this.globv.prethrowind;
                this.globv.trowind = Number(this.globv.prethrowind);
                this.selected = [this.rows[this.globv.prethrowind]];

                this.globv.tscrollpos = this.globv.prethscrollpos;

                // setTimeout(() => {
                //   this.table.element.getElementsByTagName('datatable-body')[0].scrollTop = Number( this.globv.prethscrollpos );
                // });

              }
            }
          });
        this.globv.NOVI = false;
        this.setPage({ offset: 0 });
      } else {
        this.tIdStud = this.globv.tidstud;
        this.page.pageNumber = this.globv.toffset ;
        this.setPage({ offset: this.globv.toffset  });
      }
    }

    // this.setPage({ offset: 0 });
    //this.setPage({ offset: this.page.pageNumber });


  }

  updateTable() {
    // this.rows[0].Code = '261';
    this.rows = [...this.rows];
  }

  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);
    // alert ('selected ' + this.selected[0].FirstName);

    this.tIdStud = this.selected[0].IdStud;
    this.globv.tidstud = this.tIdStud;
    this.tselectedindex =  this.tIdStud;
    this.globv.tselind = this.tIdStud ;

    this.globv.toffset = this.page.pageNumber;
  }

  getselectedrowindex(tIdStud: any): number {
    let tind = -1;

    let rowsAmt = this.rows.length;

    for (let i = 0 ; i < rowsAmt ; i++) {
      // check for a match
      if (this.rows[i].IdStud === tIdStud.toString() ){
        // found match, return true to add to result set
        return i;
      }
    }

    return -1;
  }


  otvori() {
    let a = this.selected[0];
    if (!a) {
      this.tmessage = 'No row selected.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.globv.NOVI = false;
    let trind = this.getselectedrowindex(this.tIdStud );
    //
    // let dataRecord = this.myGrid.getrowdata(trind);
    const tidbroj = this.tIdStud ;
    this.globv.tidstud = this.tIdStud ;
    this.globv.toffset = this.page.pageNumber;

    this.dajStudenta(trind, tidbroj);
  }

  public dajStudenta(rowindex, tidbroj): any {

    if (rowindex === -1) {
      return;
    }

    // this.globv.NOVI = true;

    this.globv.tselind = rowindex;
    this.globv.toffset = this.page.pageNumber;

    this.dbService.uzmiStudenta(tidbroj, this.globv.tIMEMDB)
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

    this.dbService.updejtajStudenta(tIdStud, this.tstdnt.Code, this.tstdnt.LastName, this.tstdnt.FirstName, this.tstdnt.Address, this.tstdnt.Email, Number(this.tstdnt.Age), this.tstdnt.EnrDate)
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
          this.rows[this.tselectedindex].IdStud = this.tstdnt.IdStud;
          this.rows[this.tselectedindex].FirstName = this.tstdnt.FirstName;
          this.rows[this.tselectedindex].LastName = this.tstdnt.LastName;

        }
        // this.tIdStud = this.tstdnt.IdStud;
        // this.globv.tidstud = this.tIdStud;
      });
  }

  // public brisiRed(): any {
  //   this.page.pageNumber = 1;
  //   this.setPage({ offset: 1 });
  //   // this.table.offset = 1;
  // }


  public brisiRed(): any {
    if (this.globv.tIMEMDB === 'AdcUniversity') {
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
    this.globv.tidstud = this.tIdStud ;
    this.globv.toffset = this.page.pageNumber;

    let a = this.selected[0];
    if (!a) {
      this.tmessage = 'No row selected.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    // let rowindex = this.myGrid.getselectedrowindex();
    let rowindex = this.getselectedrowindex(this.tIdStud );
    if (rowindex === -1) {
      this.tmessage = 'No row selected.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.globv.tselind = rowindex;

    // const tidbroj = this.globv.tidstud;
    const tidbroj = this.globv.tidstud;

    // alert('brisem' + tidbroj);

    this.dbService.brisiStudenta(tidbroj)
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

          // this.trowindex = this.globv.tselind;
          // alert('broj:' + this.tdummy.broj1 + '    dodano:' + this.tdummy.tekst1);

          // let a = this.rows[this.globv.tselind];
          this.selected = [this.rows[this.globv.tselind]];
          // this.selected = [this.rows[1]];
          // let b = 0;
          this.selected = [this.rows[-1]];
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


  novi() {
    if (this.globv.tIMEMDB === 'AdcUniversity') {
      this.tmessage = 'This is a demo database.';
      this.messageWindow.position('center');
      this.messageWindow.open();
      return;
    }

    this.globv.prethscrollpos = this.globv.tscrollpos;
    this.globv.prethrowind = this.tIdStud;
    // this.globv.trowind;

    this.globv.NOVI = true;
    this.dodajStudenta();
  }

  public dodajStudenta(): any {

    this.dbService.dajMaksIdStud()
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

      this.dbService.dajCountStud(this.globv.tIMEMDB)
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

      this.dbService.dodajStudentaUBazu(noviStud)
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

          // this.myGrid.selectrow(this.globv.trowind);
          // this.myGrid.ensurerowvisible(this.globv.trowind);
          this.selected = [this.rows[this.globv.trowind]];

          // setTimeout(() => {
          //   // this.table.element.getElementsByTagName('datatable-body')[0].scrollTop = Number( this.globv.tscrollpos );
          //   this.table.element.getElementsByTagName('datatable-body')[0].scrollTop = 269;
          // });

          // this.globv.tscrollpos = 5000;

          // let aa = this.table.bodyHeight;
          // let bb =  this.table.element.getElementsByTagName('datatable-body')[0].bodyHeight;
          let aa = 500000;
          this.globv.tscrollpos =  aa;

          this.dajStudenta(this.globv.trowind, noviiidstud);

        });
    }
  }

  ukbroj(): any {
    const a = this.DajUkbr();
    const uk = a[0].count;
    return uk;
  }

  DajUkbr(): any[] {
    let i = 0;
    let ukPodaci = [];
    $.ajax({
      url: 'http://' + this.globv.THOST + ':8089/api/getCount/',
      // data: '{timebaze: "' + this.globv.tIMEMDB  + '" }',
      // data: '1 "' + this.globv.tIMEMDB + '" 2',

      // data: 'timebaze:"' + this.globv.tIMEMDB  + '"',
      // data: '1:"' + this.globv.tIMEMDB + '", 2: "abcd"',
      data: {timebaze: this.globv.tIMEMDB, Name: 'zeljko', Adresa: 'ilica 4'},
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
}

