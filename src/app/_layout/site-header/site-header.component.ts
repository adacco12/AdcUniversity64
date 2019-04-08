// import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';

import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import {MessageComponentService} from '../../message.component.service';
import {DbService} from '../../db.service';
import {Dekl} from '../../dekl.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  doslaporuka: string = 'jos nista ...';
  globv = environment;

  message: any;
  subscription: Subscription;

  public tsearchstring: string;
  public sstudent_code: string;

  constructor(
    private router: Router,
    private messageService: MessageComponentService,
    public dekl: Dekl
  ) {
    // this.tsearchstring = '00';

    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        this.message = message;

        let a = dajobjectkey(message.dekl, 'tekst3');

        if ( this.globv.emit_to_page === 'header') {
          // alert(a);
          this.doslaporuka = 'Header je čuo! ' + a;
        }
      });

  }

  ngOnInit() {
  }

  public sajtsearch(): any {

    //let c = tstr;

    const a = this.tsearchstring;
    const b = this.sstudent_code;

    // if (this.tsearchstring === null || this.tsearchstring  === undefined || this.tsearchstring.length <= 2) {
    if (this.tsearchstring === null || this.tsearchstring  === undefined) {
      return;
    } else {
      // alert(this.tsearchstring);
      //
      this.globv.tsearchstring = this.tsearchstring;
      this.sendMessage2();
    }


    this.router.navigateByUrl('/sajtsearch');
  }

  sendMessage2(): void {
    // alert('Šaljem 3');
    // this.dekl.tekst3 = 'Naredba from Header3 Component to Page3 Component!';
    this.dekl.tekst3 = this.tsearchstring;
    this.globv.emit_to_page = 'sitesearch';
    // send message to subscribers via observable subject
    this.messageService.sendMessage2(this.dekl);

    this.tsearchstring  = '';
  }

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


