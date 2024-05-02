import {Component, Inject, OnInit, AfterViewInit} from '@angular/core';
import { DbmongoService } from '../dbmongo.service';
import {environment} from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {Student} from '../student.service';
import {Router} from '@angular/router';
import {Dummy} from '../dummy.service';
import {Dekl} from '../dekl.service';
import {EMPTY, Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';


// u app.module.ts
// import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
// import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
// import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@Component({
  selector: 'app-ngfor',
  templateUrl: './ngfor.component.html',
  styleUrls: ['./ngfor.component.css']
})
export class NgforComponent implements OnInit {
  public ttImeMdb = 'AdcUniversity2';
  globv = environment;
  tdata: any;
  rows = [];
  // initializing p to one
  p: number = 1;
  filter = '';
  something = 'i';
  //filter: void;
  tval = 'vl';
  tmessage = 'Choose a file to upload.';
  public odg: any;

  // tprofile: any = {
  //   filter: '_'
  // };

  // sorting
  key: string = 'IdStud'; //  'name'; //set default
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private dbmongoService: DbmongoService,
    private router: Router,
    // private messageService: MessageComponentsService,
    public selectedStudent: Student,
    public dekl: Dekl,
    public tdummy: Dummy,
    public tstdnt: Student,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    // if (this.storage.get('member_name') === null) {
    //   this.router.navigate(['notlogged']);
    //   return;
    // }

    this.ttImeMdb = this.storage.get('ime_mdb');
    //this.filter = '';
    this.tval = '45';

    //alert('to je ' +this.ttImeMdb);

    this.generate3();

    setTimeout(() => {
      this.filter = '';
    }, 350);
  }

  ngAfterViewInit(): void {

    // alert('after');
    // this.filter = '';
    //
    // if (this.storage.get('member_name') ===  null) {
    //   this.router.navigate(['notlogged']);
    //   return;
    // }
    //
    // this.ttImeMdb = this.storage.get('ime_mdb');
    // //this.filter = '';
    // this.tval = '45';
    //
    // this.generate3();
  }

  public generate3(): any {

    // this.dbmongoService.getStudents(this.ttImeMdb)
    this.dbmongoService.getStudents(this.ttImeMdb)
      .subscribe(data => {
        let datagStudentiGrid = [];

        // this.tdata = data;
        this.rows = [];

        const rowsn = [...this.rows, ...data];
        this.rows = rowsn;

        const string = JSON.stringify(rowsn);
        //alert('to je' +string);
        // const a = 0;
        //
        // datagStudentiGrid = JSON.parse(string);
        // const c = 0;
      });
  }

  goto(): void {
    this.p = 2;
    // alert('goto');
  }

  dobardan() {
    this.DaLiRadi2();
    alert('Dobar dan');
  }

  dobrovece() {
    alert('Dobro veče1');
    this.DaLiRadi3();
    alert('Dobro veče');

    let map = { key1 : 'value1', key2 : 'value2' };

    for (let [key, value] of Object.entries(map)) {
      console.log(`${key}: ${value}`);
    }

  }


  // DaLiRadi() {
  //   // this.http.get('http://' + this.globv.THOST + ':3000/api/check', {responseType: 'text'})
  //   this.http.get('http://' + this.globv.THOST + ':4001/check', {responseType: 'text'})
  //     .subscribe((data) => {
  //       this.odg = data;
  //       // alert ('1.1');
  //       // alert('to je ' + this.odg[0].a);
  //       const a = ' -www 15 ';
  //       // alert(data.toString() + a);
  //
  //       if (data.toString() === 'radi') {
  //         // this.tserviceenebled = true;
  //         // this.radimo();
  //         this.tmessage = 'Service  available.';
  //       } else {
  //         // alert(' ne radimo');
  //         this.tmessage = 'Service not available.';
  //         // this.tserviceenebled = false;
  //       }
  //
  //     }, (err) => {
  //       // console.log(err);
  //       // alert('greska -  ne radimo');
  //       this.tmessage = 'Service not available.';
  //       // this.tserviceenebled = false;
  //     });
  //
  // }

  DaLiRadi2(): any {

    // this.dbmongoService.provjeri()
    this.dbmongoService.provjeri('qqq')
      .subscribe(data => {


        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;

        const a = this.tdummy.tekst1;
        // b = this.tdummy.tekst2;
        const b = this.tdata[0].tekst2;

        this.tmessage = a + ' ' + b;

        if (a === 'greska') {
          alert('error with database');
        }
        if (a === 'ok') {
          // alert('update ok');
        }
      });
  }

  DaLiRadi3(): any {

    // this.dbmongoService.provjeri()
    this.dbmongoService.provjeri3()
      .subscribe(data => {


        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;

        const a = this.tdummy.tekst1;
        // b = this.tdummy.tekst2;
        const b = this.tdata[0].tekst2;

        this.tmessage = a + ' ' + b;

        if (a === 'greska') {
          alert('error with database');
        }
        if (a === 'ok') {
          alert('update ok');
        }
      });
  }

  DaLiBazaPostoji(): any {
    this.dbmongoService.bazapostoji('qqq4')
      .subscribe(data => {
        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;
        this.tdummy.tekst2 = this.tdata[0].tekst2;

        const a = this.tdummy.tekst1;
        const b = this.tdummy.tekst2;
        // const b = this.tdata[0].tekst2;
        //
        this.tmessage = a + ' ' + b ;

        // if (a === 'greska') {
        //   alert('ne postoji ');
        // }
        // if (a === 'ok') {
        //   alert('postoji');
        // }
        //alert('to je  ' + a + ' ' + b);

      });
  }

}

