import { Component, OnInit } from '@angular/core';
import {MessageComponentService} from '../message.component.service';
import {Dekl} from '../dekl.service';
import { environment } from '../../environments/environment';
import {Subscription} from 'rxjs';
import { BehaviorSubject,  Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DbService } from '../db.service';

import {mojsajt} from '../mojsajt';
import {Dummy} from '../dummy.service';

@Component({
  selector: 'app-sajtsearch',
  templateUrl: './sajtsearch.component.html',
  styleUrls: ['./sajtsearch.component.css']
})
export class SajtsearchComponent implements OnInit {

  doslanaredba: string = 'čekam naredbu ...';
  globv = environment;

  message: any;
  subscription: Subscription;
  public tcolor = 'blue';
  tdata: any;
  p: any;

  myObj = {
    'background-color' : this.tcolor,
    'font-weight': 'bold',
    'height': '30px',
    'width': '60px'
  }

  rows = [];
  t2mojsajt = mojsajt;
  tmojsajt = this.rows;
  public filter = '';
  // sorting
  key: string = 'link'; //  'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(
    private dbService: DbService,
    private messageService: MessageComponentService,
    public dekl: Dekl,
    public tdummy: Dummy,
    private http: HttpClient
  ) {

    // this.fetch((data) => {
    //   // this.temp = [...data];
    //   this.rows.push(...data);
    //
    //   this.tmojsajt = this.rows;
    //   const aw = this.t2mojsajt;
    // });

    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        this.message = message;

        let a = dajobjectkey(message.dekl, 'tekst3');

        if ( this.globv.emit_to_page === 'sitesearch') {

          // alert(a);
          //this.doslanaredba = 'Page3 je čuo! '  + a;
          // this.doslanaredba = 'Page3 je čuo! '  + message.dekl.tekst3;
          this.filter =  message.dekl.tekst3;
        }
      });


  }

  ngOnInit() {
    this.tcolor = 'red';
    this.myObj = {
      'background-color': this.tcolor,
      'font-weight': 'bold',
      'height': '30px',
      'width': '60px'
    };

    // this.fetch((data) => {
    //   // this.temp = [...data];
    //   this.rows.push(...data);
    //
    //   this.tmojsajt = this.rows;
    //   const aw = this.t2mojsajt;
    //
    //   this.filter = this.globv.tsearchstring;
    //
    // });


    this.dbService.dajSajtJson()
      .subscribe(data => {

        this.tdata = data;
        this.tdummy.tekst1 = this.tdata[0].tekst1;
        this.tdummy.tekst2 = this.tdata[0].tekst2;
        //this.tdummy.broj2 = this.tdata[0].broj2;
        //this.tdummy.tekst2 =  this.tdata[0].tekst2;

        const a = this.tdummy.tekst1;
        const a1 = this.tdummy.tekst2;

        if (this.tdummy.tekst1 === 'Error') {
          alert('Error :' + this.tdummy.tekst2);
          return;
        } else {
          // alert('Radi :' + this.tdummy.tekst2);

          const a = this.tdummy.tekst2;
          // alert('o2 ' + a);
          const k = a.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g,' ').replace(/^\s+|\s+$/,'')
          // var b = k.replace('\r', '');
          // const c = b.replace('\n', '');
          // alert(k);
          const m = JSON.parse(k);

          this.rows.push(...m);

          this.tmojsajt = this.rows;
          const aw = this.t2mojsajt;

          this.filter = this.globv.tsearchstring;
        }

      });


  }

  dajfilter(): void {
    alert('filter');
    this.filter = 'gt';
    // this.sendMessage2();
  }

  sendMessage2(): void {
    alert('Šaljem');
    this.dekl.tekst3 = '100511';
    this.globv.emit_to_page = 'header';
    // send message to subscribers via observable subject
    this.messageService.sendMessage2(this.dekl);
  }

  klik(): void {
    alert('klik');

    this.tcolor = 'green';
    this. myObj = {
      'background-color' : this.tcolor,
      'font-weight': 'bold',
      'height': '30px',
      'width': '60px'
    };
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    // req.open('GET', 'https://unpkg.com/@swimlane/ngx-datatable@6.3.0/assets/data/company.json');
    // req.open('GET', '../../assets/data/site.json');
    // req.open('GET', '././assets/data/site.json');
    // req.open('GET', 'assets/data/site.json');
    req.open('GET', '../../data/site.json');

    // req.open('GET', 'http://www.angular.siteknower.com/assets/data/site.json');

    req.onload = () => {
      // const a = JSON.stringify(req.response);
      const a = req.response;
      alert('o2 ' + a);
      const k = a.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g,' ').replace(/^\s+|\s+$/,'')
      // var b = k.replace('\r', '');
      // const c = b.replace('\n', '');
      //alert(k);
      cb(JSON.parse(k));
      // cb(JSON.stringify(req.response));
    };


    req.send();
  }

  // public fetch(): Observable<any>  {
  //   return this.http.get('../../assets/data/site.json')
  //     .map((res: any) => res.json())
  //     .catch((error: any) => console.log(error));
  // }

}


function dajobjectkey(tobject: object, tkey: string) {
  let result = '';

  for (let p in tobject) {
    if ( tobject.hasOwnProperty(p) ) {
      // result += p + ' , ' + message.dekl[p];
      if (p === tkey) {result = tobject[p]; }
    }
  }
  return result;
}
