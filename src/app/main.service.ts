import {Inject, Injectable} from '@angular/core';
import { BehaviorSubject,  Observable } from 'rxjs';

import {Dekl} from './dekl.service';
import {LOCAL_STORAGE, StorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {DbService} from './db.service';
// import {MessageComponentsService} from './message.components.service';
import {Student} from './student.service';

export class ResultData {
  name: string;
}

export class ResultData2 {
  nayiv: string;
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    public dekl: Dekl
  ) { this.dekl.tekst2 = 'abcdq'; }

  // private outputSubject: BehaviorSubject<ResultData> = new BehaviorSubject(null);
  private outputSubject2: BehaviorSubject<Dekl> = new BehaviorSubject(null);

  // this.send2(this.dekl);

  // output2: Observable<Dekl> = this.outputSubject2.asObservable();

  output2():  Observable<Dekl> {
    this.dekl.tekst2 = 'konj';
    this.outputSubject2.next( this.dekl);
    return this.outputSubject2.asObservable();
  }

  ImageExist(turl):  Observable<Dekl> {
    let img = new Image();
    let rtn = '0';
    img.onload = function() { rtn = '1'; };
    img.onerror = function() { rtn = '0'; };
    img.src = turl;

    // if (img.height !== 0) {
    //   rtn = '1';
    // } else {
    //   rtn = '0';
    // }
    //return img.height != 0;
    // return rtn;

    this.dekl.tekst2 = rtn;
    this.outputSubject2.next( this.dekl);
    return this.outputSubject2.asObservable();
  }

  // output: Observable<ResultData> = this.outputSubject.asObservable();

  // send(data: ResultData) {
  //   this.outputSubject.next(data);
  // }

  // send2(data: Dekl) {
  //   this.outputSubject2.next(data);
  // }


}
