import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {forkJoin, Observable, of} from 'rxjs';
import { map, take, catchError, tap } from 'rxjs/operators';
import * as $ from 'jquery';

import {Dekl} from './dekl.service';
import {Dummy} from './dummy.service';
import { Student } from './student.service';
import { User } from './user.service';

import {environment} from '../environments/environment';

// import { PagedData } from './model/paged-data';
// // import { Cstudent } from './cstudent';
// import { Page } from './model/page';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  globv = environment;

  private userUrl3 = 'http://' + this.globv.THOST + ':8089/api/GetUserPassword/';
  private customersUrlgetStudents = 'http://' + this.globv.THOST + ':8089/api/getStudents/';
  private customersUrlgetStudentsP = 'http://' + this.globv.THOST + ':8089/api/getStudentsP/';
  private customersGetStudent = 'http://' + this.globv.THOST + ':8089/api/GetStudent/';
  private customersUrlUpdateStudent = 'http://' + this.globv.THOST + ':8089/api/updateStudent/';
  private customersUrlBrisi = 'http://' + this.globv.THOST + ':8089/api/deleteStudent/';
  private customersUrl7 = 'http://' + this.globv.THOST + ':8089/api/addStudent/';
  private customersUrl8 = 'http://' + this.globv.THOST + ':8089/api/getMaxID/';
  private customersUrl9 = 'http://' + this.globv.THOST + ':8089/api/getCountN/';
  // private customersBrisiSliku = 'http://www.adacco.com:3000/api/deletefile/';
  // private customersUrlgetStud = 'http://' + 'localhost' + ':8089/api/getStud/';
  private customersUrlgetStud = 'http://' + this.globv.THOST + ':8089/api/getStud/';
  private UrlSajtJson = 'http://' + this.globv.THOST + ':8089/api/getSiteJson/';

  firstNames: string[] =
    [
      'Andrew', 'Nancy', 'Shelley', 'Regina', 'Yoshi',
      'Antoni', 'Mayumi', 'Ian', 'Peter', 'Lars', 'Petra', 'Martin', 'Sven', 'Elio', 'Beate', 'Cheryl', 'Michael', 'Guylene'
    ];
  lastNames: string[] =
    [
      'Fuller', 'Davolio', 'Burke', 'Murphy', 'Nagase', 'Saavedra',
      'Ohno', 'Devling', 'Wilson', 'Peterson', 'Winkler', 'Bein', 'Petersen', 'Rossi', 'Vileid', 'Saylor', 'Bjorn', 'Nodier'
    ];
  productNames: string[] =
    [
      'Black Tea', 'Green Tea', 'Caffe Espresso', 'Doubleshot Espresso',
      'Caffe Latte', 'White Chocolate Mocha', 'Cramel Latte',
      'Caffe Americano', 'Cappuccino', 'Espresso Truffle',
      'Espresso con Panna', 'Peppermint Mocha Tplowist'
    ];
  priceValues: string[] =
    [
      '2.25', '1.5', '3.0', '3.3', '4.5', '3.6', '3.8', '2.5',
      '5.0', '1.75', '3.25', '4.0'
    ];


  constructor(
    private http: HttpClient) { }

  GetUserPassword(imebaze: string, tlogin: string): Observable<Dummy[]> {

    let turl = `${this.userUrl3}${imebaze}`
    turl = turl  + '/' + tlogin;
    // const a = this.http.get<User[]>(turl);
    // return this.
    // http.get<User[]>(turl);
    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  getStudents (tdatabase: string): Observable<Student[]> {
    let turl = `${this.customersUrlgetStudents}`;
    turl = turl + tdatabase;
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  getStudentsP (tdatabase: string): Observable<Student[]> {
    let turl = `${this.customersUrlgetStudentsP}`;
    turl = turl + tdatabase;
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  getStudentsPage (tdatabase: string, tstartindex: string, tendindex: string, torder: string, twhere: string): Observable<Student[]> {
    let turl = `${this.customersUrlgetStud}`;
    turl = turl + tdatabase;
    turl = turl + '/' + tstartindex;
    turl = turl + '/' + tendindex;
    turl = turl + '/' + torder;
    turl = turl + '/' + twhere;

    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  // getStudents3 (tdatabase: string): Observable<Student[]> {
  //   const a = 1;
  //   return of(STUDENTS);
  // }

  // getStudents4 (tdatabase: string): Observable<Student[]> {
  //   let tst: Student[];
  //   const tstudents = [
  //     { Code: '001', IdStud: 11, FirstName: 'Mr. Nice', LastName: '1', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '002', IdStud: 12, FirstName: 'Mr. Nice2', LastName: '2', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '003', IdStud: 13, FirstName: 'Mr. Nice3', LastName: '3', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '004', IdStud: 14, FirstName: 'Mr. Nice4', LastName: '4', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '005', IdStud: 15, FirstName: 'Mr. Nice6', LastName: '5', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '006', IdStud: 16, FirstName: 'Mr. Nice6', LastName: '6', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '007', IdStud: 17, FirstName: 'Mr. Nice7', LastName: '7', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '008', IdStud: 18, FirstName: 'Mr. Nice8', LastName: '8', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '009', IdStud: 19, FirstName: 'Mr. Nice9', LastName: '9', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '010', IdStud: 20, FirstName: 'Mr. Nice10', LastName: '10', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '001', IdStud: 21, FirstName: 'Mr. Nice11', LastName: '11', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '012', IdStud: 22, FirstName: 'Mr. Nice12', LastName: '12', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '013', IdStud: 23, FirstName: 'Mr. Nice13', LastName: '13', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '014', IdStud: 24, FirstName: 'Mr. Nice14', LastName: '14', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '015', IdStud: 25, FirstName: 'Mr. Nice15', LastName: '15', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '016', IdStud: 26, FirstName: 'Mr. Nice16', LastName: '16', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '017', IdStud: 27, FirstName: 'Mr. Nice17', LastName: '17', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '018', IdStud: 28, FirstName: 'Mr. Nice18', LastName: '18', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '019', IdStud: 29, FirstName: 'Mr. Nice19', LastName: '19', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '020', IdStud: 30, FirstName: 'Mr. Nice20', LastName: '20', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '021', IdStud: 31, FirstName: 'Mr. Nice21', LastName: '21', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '022', IdStud: 32, FirstName: 'Mr. Nice22', LastName: '22', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '023', IdStud: 33, FirstName: 'Mr. Nice23', LastName: '23', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '024', IdStud: 34, FirstName: 'Mr. Nice24', LastName: '24', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '025', IdStud: 35, FirstName: 'Mr. Nice25', LastName: '25', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '026', IdStud: 36, FirstName: 'Mr. Nice26', LastName: '26', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '027', IdStud: 37, FirstName: 'Mr. Nice27', LastName: '27', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '028', IdStud: 38, FirstName: 'Mr. Nice28', LastName: '28', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' },
  //     { Code: '029', IdStud: 39, FirstName: 'Mr. Nice29', LastName: '29', Email: '',  Red_br: 1, EnrDate: '', Address: '', Age: '' }
  //   ];
  //   tst = tstudents;
  //   // return {tstudents};
  //   const a = 1;
  //   // return of (tstudents);
  //   return of (tst);
  // }

  getStudents5 (tdatabase: string) {
    let turl = `${this.customersUrlgetStudents}`;
    turl = turl + tdatabase;
    // const a = this.http.get<Student[]>(turl);
    let i = 0;
    let mojii_data = [];

    return this.http.get<Student[]>(turl)
      .pipe(
        map(result => {
          if (!result) {
            // alert('gr1')
            // this.globv.HTTP_ANSWER = 3;
            // this.globv.err_message = 'Could not fetch data!';
            localStorage.setItem('HTTP_ANSWER', '3' );
            localStorage.setItem('err_message', 'Could not fetch data!' );

            // return ('Could not fetch data!');
            return mojii_data;
          } else {
            // alert('ok');
            $.map(result, function (item) {
              const rowm = {};

              rowm['id'] = i;
              rowm['FirstName'] = item.FirstName;
              rowm['LastName'] =  item.LastName;

              if (i <= 9) { mojii_data[i] = rowm; }
              i = i + 1;
            });

            // this.globv.HTTP_ANSWER = 2;
            // this.globv.err_message = 'ok';
            localStorage.setItem('HTTP_ANSWER', '2' );
            localStorage.setItem('err_message', 'ok' );
            this.globv.moji_data = mojii_data;
            return mojii_data;
          }
        }),
        // catchError((err, caught) => {
        catchError((err) => {
          // alert('gr3 ' + err.message);
          // this.globv.HTTP_ANSWER = 3;
          // this.globv.err_message = err.message;
          localStorage.setItem('HTTP_ANSWER', '3' );
          localStorage.setItem('err_message', err.message );
          // return ('error ' + err.toString());
          return ( err.message  );
        })
      )

      .subscribe(( data => {
          let datagStudentiGrid = [];
          let i = 0;

          $.map(data, function (item) {
            let row = {};

            row['FirstName'] = item.FirstName;
            row['LastName'] = item.LastName;
            datagStudentiGrid[i] = row;
            i = i + 1;
          });

          // this.globv.HTTP_ANSWER = 2;
          // this.globv.err_message = 'ok';
          localStorage.setItem('HTTP_ANSWER', '2' );
          localStorage.setItem('err_message', 'ok' );

          this.globv.moji_data = datagStudentiGrid;
          return datagStudentiGrid;

        })
      );

    //   return this.http.get<Student[]>(turl)
    //     .map(data => {}/* do something with data */),
    // .tap(data => /* does something, but it does not reflect to the data in the subscribe? */),
    // .catchError(this.handleError<Hero>(`getHero id=${id}`))
    //   // let tst: Student[];
    //
    // let tstosv : Observable<Student[]>;

    // this.http.get<any[]>(turl).pipe(
    //    map((data: any) => {
    //      const results: any = [];
    //      data.map(item => {
    //        // item.FirstName
    //        results.push(item);
    //      });
    //      tst = results;
    //    }
    //  ));



  }

  // getStudents6 (tdatabase: string) {
  //   let turl = `${this.customersUrlgetStudents}`;
  //   turl = turl + tdatabase;
  //
  //   return this.http.get<Student[]>()
  //     .pipe(map(data => data));
  // }

  getStudents7 (tdatabase: string): string {
    let turl = `${this.customersUrlgetStudents}`;
    turl = turl + tdatabase;
    // const a = this.http.get<Student[]>(turl);
    let i = 0;
    let mojii_data = {};

    let vrativalue = '0';

    this.http.get<string>(turl)
      .pipe(
        map(result => {
          if (!result) {
            // alert('gr1')
            // this.globv.HTTP_ANSWER = 3;
            // this.globv.err_message = 'Could not fetch data!';
            // localStorage.setItem('HTTP_ANSWER', '3' );
            // localStorage.setItem('err_message', 'Could not fetch data!' );

            // return ('Could not fetch data!');
            vrativalue = '3';
            return '3';
          } else {
            // alert('ok');
            $.map(result, function (item) {
              const rowm = {};

              rowm['id'] = i;
              rowm['FirstName'] = item.FirstName;
              rowm['LastName'] =  item.LastName;

              if (i <= 9) { mojii_data[i] = rowm; }
              i = i + 1;
            });

            // this.globv.HTTP_ANSWER = 2;
            // this.globv.err_message = 'ok';
            // localStorage.setItem('HTTP_ANSWER', '2' );
            // localStorage.setItem('err_message', 'ok' );
            vrativalue = '2';
            return '2';
          }
        }),
        // catchError((err, caught) => {
        catchError((err) => {
          alert('gr3 ' + err.message);
          // this.globv.HTTP_ANSWER = 3;
          // this.globv.err_message = err.message;
          // localStorage.setItem('HTTP_ANSWER', '3' );
          // localStorage.setItem('err_message', err.message );
          // return ('error ' + err.toString());
          vrativalue = '3';
          return ('3');
        })
      )

      .subscribe(( data => {
          let datagStudentiGrid = [];
          let i = 0;

          $.map(data, function (item) {
            let row = {};

            row['FirstName'] = item.FirstName;
            row['LastName'] = item.LastName;
            datagStudentiGrid[i] = row;
            i = i + 1;
          });

          // this.globv.HTTP_ANSWER = 2;
          // this.globv.err_message = 'ok';
          // localStorage.setItem('HTTP_ANSWER', '2' );
          // localStorage.setItem('err_message', 'ok' );

          vrativalue = '2';
          return '2';

        })
      );

    if ( vrativalue !== '0') { return vrativalue; }
  }

  uzmiStudenta(id: number, tdatabase: string): Observable<Student[]> {
    let turl = `${this.customersGetStudent}${id}`;
    turl = turl + '/' + tdatabase;
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  updejtajStudenta(id: number, code: string, prezime: string, ime: string, address: string, email: string, age: number, vreme: string ): Observable<Dekl[]> {

    // alert('updejtajStudenta n');
    if (address === '') { address = ' '; }

    let turl = `${this.customersUrlUpdateStudent}${id}`;
    turl = turl + '/' + code;
    turl = turl + '/' + prezime;
    turl = turl + '/' + ime;
    turl = turl + '/' + address;
    turl = turl + '/' + email;
    turl = turl + '/' + age;
    turl = turl + '/' + vreme;
    const a = this.http.get<Dekl[]>(turl);
    return this.http.get<Dekl[]>(turl);

  }

  dajMaksIdStud(): Observable<Dummy[]> {
    const turl = `${this.customersUrl8}`;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  dajCountStud(tdatabase: string): Observable<Dummy[]> {
    let turl = `${this.customersUrl9}`;
    turl = turl  + tdatabase;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  dodajStudentaUBazu(id: number): Observable<Dummy[]> {

    let turl = `${this.customersUrl7}${id}`;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);

  }

  brisiStudenta(id: number): Observable<Dummy[]> {

    // alert('id je' + id);
    const strid = id.toString();
    const turl = `${this.customersUrlBrisi}${strid}`;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  brisisliku(tdir: string, tfile: string) {
    const domena = 'www.adacco.com';
    const turl = 'http://' + domena + ':3000/api/deletefile/' + tdir + '/' + tfile;
    // this.http.get(turl);

    this.http.get(turl, {responseType: 'text'})
      .subscribe((data) => {
        //this.odg = data;
        //alert ('1.1');
        // alert('to je ' + this.odg[0].a);


      }, (err) => {
        // console.log(err);
        //alert('greska -  ne radimo');

      });
  }

  getStudents71 (tdatabase: string): Observable<Student[]> {
    let turl = `${this.customersUrlgetStudents}`;
    turl = turl + tdatabase;
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  getStudents72 (tdatabase: string) {
    let turl = `${this.customersUrlgetStudents}`;
    turl = turl + tdatabase;
    // // const a = this.http.get<Student[]>(turl);
    // let i = 0;
    // let mojii_data = {};

    // return this.http.get<Student[]>(turl);

    const trnddata = this.http.get(turl, {observe: 'body'});
    return trnddata;
  }

  // getStudents73 (tdatabase: string): Student[] {
  //   let turl = `${this.customersUrlgetStudents}`;
  //   turl = turl + tdatabase;
  //   const a = this.http.get<Student[]>(turl);
  //   // return this.http.get<Student[]>(turl);
  // }

  public check() {
    const customersUrlgetStudents = 'http://' + this.globv.THOST + ':8089/api/getStudents/';

    let turl = `${customersUrlgetStudents}`;
    turl = turl + this.globv.tIMEMDB ;

    return this.http.get<Student[]>(turl)
      .pipe(
        map(result => {
          if (!result)  {
            return false;
          } else {}
        })
      );
  }


  dajSajtJson(): Observable<Dummy[]> {
    let turl = `${this.UrlSajtJson}`;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

}
