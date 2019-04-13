import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Dummy} from './dummy.service';

// import 'rxjs/add/operator/map';

// import { map } from 'rxjs/operators';
// import {Dummy} from './dummy.service';

@Injectable({
  providedIn: 'root'
})
export class ImagecontrolService {
//   headers: any;
//   constructor() { }
// }
//
// @Injectable()
// export class GetDataService {
  tbroj: number = 0;
  headers: any;
  private userUrl3 = 'http://www.test.siteknower.com/ImageControl.asmx/HelloWorld/';

  constructor(private _http: HttpClient) {

  }

  getData4(): any {
    alert('3');
    return this._http
      .get<any[]>(this.userUrl3)
      .pipe(map(data => data));
  }
  // const turl = `${this.customersUrl9}`;
  //
  // const a = this.http.get<Dummy[]>(turl);

  getData3(): any {

    // return '35646545';


  }

  // const turl = `${this.userUrl3}`;
  //
  // return this._http.get<string>(turl);



}
