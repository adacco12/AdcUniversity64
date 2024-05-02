import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import {CorporateEmployee} from '../model/corporate-employee';
import { Student } from '../student.service';
import {Observable, of} from 'rxjs';
import { DbService } from '../db.service';
// import { UtilsService } from '../utils.service';
import * as $ from 'jquery';
import {environment} from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {jqxWindowComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxwindow';

import {Dekl} from '../dekl.service';
import {Dummy} from '../dummy.service';
import { DbmongoService } from '../dbmongo.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ngxscrolling',
  templateUrl: './ngxscrolling.component.html',
  styleUrls: ['./ngxscrolling.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NgxscrollingComponent implements OnInit {
  public ttImeMdb = 'AdcUniversity2';
  globv = environment;
  tdata: any;
  tscrollposition = 0;
  public tselectedindex = this.globv.tselind;
  public tekscrollpos = this.globv.tscrollpos;

  // data: any[];
  @ViewChild('myTable') table: any;

  rows = [];
  selected = [];

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 10;

  // rows: CorporateEmployee[] = [];
  isLoading: boolean;

  checkStatus = false;

  columns = [
    {name: 'Id', prop: 'IdStud'},
    {name: 'Code', prop: 'Code'},
    {name: 'First name', prop: 'FirstName'},
    {name: 'Last Name', prop: 'LastName', sortable: false}
  ];

  tIdStud = -1;

  tmessage = 'Dobro jutro jedan dva tri pet sest sedam osam devet';

  @ViewChild('areyousureWindow') areyousureWindow: jqxWindowComponent;
  @ViewChild('messageWindow') messageWindow: jqxWindowComponent;

  ngOnInit() {

    if (this.storage.get('member_name') ===  null) {
      this.router.navigate(['notlogged']);
      return;
    }

    this.checkStatus = false;

    this.ttImeMdb = this.storage.get('ime_mdb');

    // this.trefreshgrid = 'ništa još';
    // this.generate3();

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
              // this.globv.trowind = Number(this.globv.trowind) - 1;
              // this.myGrid.selectrow(this.globv.trowind );
              // isLoading [this.rows[this.globv.trowind]];
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
      }
    }
  }

  ngAfterViewInit(): void {
    this.generate3();

  }

  public generate3(): any {

    this.isLoading = true;

    this.dbmongoService.getStudents(this.ttImeMdb)
      .subscribe(data => {
        let datagStudentiGrid = [];

        // this.tdata = data;
        this.rows = [];

        const rowsn = [...this.rows, ...data];
        this.rows = rowsn;
        this.isLoading = false;

        this.globv.trowind = Number(this.tselectedindex);
        this.selected = [this.rows[this.globv.trowind]];


        // this.globv.tscrollpos = Number(this.tselectedindex);
        // this.table.element.getElementsByTagName('datatable-body')[0].scrollTop = 358;
        // this.table.element.getElementsByTagName('datatable-body')[0].scrollTop = 269;

        setTimeout(() => {
          this.table.element.getElementsByTagName('datatable-body')[0].scrollTop = Number( this.globv.tscrollpos );
        });

        this.tIdStud = this.globv.tidstud;
      });
  }

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
  ) {}

  dajMessage(): void {
    // this.tmessage = 'Dobar dan!';

    // let aa = UtilsService.pozdrav('Hello 2');
    // let aa = this.dbService.pozdrav('Hello 2');
    // alert ('Bok ' + this.utils.tekst1);
    // alert ('Bok ' + aa[1]);

  }

  updateTable() {
    // this.rows[0].Code = '261';
    this.rows = [...this.rows];
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    // alert ('selected ' + this.selected[0].FirstName);

    this.tIdStud = this.selected[0].IdStud;
    this.globv.tidstud = this.tIdStud;
    this.tselectedindex =  this.tIdStud;
    this.globv.tselind = this.tIdStud ;

    this.tekscrollpos = this.table.element.getElementsByTagName('datatable-body')[0].scrollTop;
    this.globv.tscrollpos = this.tekscrollpos ;

  }

  // onActivate(ttc) {
  //   // console.log('Select Event', selected, this.selected);
  //   // alert ('selected ' + this.selected[0].FirstName);
  //   //
  //   // this.tIdStud = this.selected[0].IdStud;
  //
  // }
  //
  // onDetailToggle({ selected }) {
  //   console.log('Select Event', selected, this.selected);
  //   // alert ('selected ' + this.selected[0].FirstName);
  //   //
  //   // this.tIdStud = this.selected[0].IdStud;
  //
  // }

  updateValue(tevent, tgender, trowIndex): any {
    alert ('Bok 3' );
  }

  // getRowHeight(row) {
  //   if(!row) return 50;
  //   if(row.height === undefined) return 50;
  //   return row.height;
  // }
  //
  // getDetailRowHeight(row: any, index: number): number {
  //   console.log("aaa", row, index);
  //   return 100;
  // }
  //
  //
  // onToggle(row: any) {
  //   setTimeout(() => {
  //     row.activation_status = 'ACTIVATED';
  //   }, 200);
  //   // console.log(row);
  //   alert(row);
  // }

  getselectedrowindex(tIdStud: any): number {
    let tind = -1;

    let rowsAmt = this.rows.length;

    for (let i = 0 ; i < rowsAmt ; i++) {
      // check for a match
      if (this.rows[i].IdStud === tIdStud ){
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
        //this.tdummy.tekst2 =  this.tdata[0].tekst2;

        const a = this.tdummy.tekst1;
        // b = this.tdummy.tekst2;
        if (a === 'greska') {
          alert('error with database');
        }
        if (a === 'ok') {
          // alert('update ok');
          // this.tstdnt.Code = this.tdata[0].Code;
          this.rows[this.tselectedindex].IdStud = this.tstdnt.Code;
          this.rows[this.tselectedindex].FirstName = this.tstdnt.FirstName;
          this.rows[this.tselectedindex].LastName = this.tstdnt.LastName;

        }
        // this.tIdStud = this.tstdnt.IdStud;
        // this.globv.tidstud = this.tIdStud;
      });
  }

  novi() {
    // if (this.globv.tIMEMDB === 'AdcUniversity') {
    //   this.tmessage = 'This is a demo database.';
    //   this.messageWindow.position('center');
    //   this.messageWindow.open();
    //   return;
    // }

    this.globv.prethscrollpos = this.globv.tscrollpos;
    this.globv.prethrowind = this.tIdStud;
    // this.globv.trowind;

    this.globv.NOVI = true;
    this.dodajStudenta();
  }

  public dodajStudenta(): any {
    alert('1 dodajem' );

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
      alert('2 pridodajStudenta j' );

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

          alert('1 dajStudenta ' );
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
      return;
    }

    this.globv.tselind = rowindex;

    // let dataRecord = this.myGrid.getrowdata(rowindex);
    // const tidbroj = dataRecord.IdStud;
    // this.globv.tidstud = dataRecord.IdStud;

    // const tidbroj = this.globv.tidstud;
    const tidbroj = this.globv.tidstud;

    // alert('brisem' + tidbroj);

    this.dbmongoService.brisiStudenta(this.globv.tIMEMDB, tidbroj)
      .subscribe(data => {
        // this.Refresh();
        this.generate3();

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

          // this.trowindex = this.globv.tselind;
          // alert('broj:' + this.tdummy.broj1 + '    dodano:' + this.tdummy.tekst1);

          this.selected = [this.rows[this.globv.trowind]];

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
    this.dbService.brisisliku(this.globv.tSlikeDir, tfilepic);
  }

  closeNo(): void {
    this.globv.YES = false;
    this.areyousureWindow.close();
  }

  // brisisliku(): void {
  //   this.dbService.brisisliku('UploadedImages3', 'aa.txt');
  //
  // }

  closeMessage(): void {
    this.messageWindow.close();

  }
}
