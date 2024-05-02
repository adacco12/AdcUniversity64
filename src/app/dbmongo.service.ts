import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {forkJoin, Observable, of} from 'rxjs';
import { map, take, catchError, tap } from 'rxjs/operators';
import * as $ from 'jquery';

import {Dekl} from './dekl.service';
import {Dummy} from './dummy.service';
import {Student } from './student.service';
import { User } from './user.service';

import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DbmongoService {
  globv = environment;

  domena = 'localhost';
  // UrlgetStudents = 'http://' + this.domena + ':4001/studenti';
  // UrlgetStudents = 'http://' + this.globv.THOST  + ':4001/studenti';
  UrlgetStudents = 'http://' + this.globv.THOST  + ':4001/studenti/get';
  UrlgetMaxID = 'http://' + this.globv.THOST + ':4001/studenti/getMaxID/';
  UrlgetCountN = 'http://' + this.globv.THOST + ':4001/studenti/getCountN/';
  UrladdStudent = 'http://' + this.globv.THOST + ':4001/studenti/addStudent/';
  UrlGetStudent = 'http://' + this.globv.THOST + ':4001/studenti/GetStudent/';
  UrlUpdateStudent = 'http://' + this.globv.THOST + ':4001/studenti/updateStudent/';
  UrlBrisiStudent = 'http://' + this.globv.THOST + ':4001/studenti/deleteStudent/';
  UrlGetStudentPage = 'http://' + this.globv.THOST + ':4001/studenti/GetStudentPage/';

  UrlUpload = 'http://' + this.globv.THOST + ':4001/studenti/upload/';

  UrlDaliradi = 'http://' + this.globv.THOST + ':4001/studenti/check/';
  UrlDaliradi3 = 'http://' + this.globv.THOST + ':4001/studenti/check3';

  UrlUser = 'http://' + this.globv.THOST + ':4001/useri/GetUser/';

  UrlUpdateStudent2 = 'http://' + this.globv.THOST + ':4001/studenti/updateStudent2/';

  UrlBazaPostoji = 'http://' + this.globv.THOST + ':4001/studenti/databaseexists/';


  // private UrlGetStudent = 'http://' + this.globv.THOST + ':8089/api/GetStudent/';

  // private customersUrlgetStudents = 'http://' + this.globv.THOST + ':8089/api/getStudents/';

  constructor(
    private http: HttpClient,
    public selectedStudent: Student
    ) { }

  GetUser(imebaze: string, tlogin: string): Observable<User[]> {

    let turl = `${this.UrlUser}${imebaze}`
    turl = turl  + '/' + tlogin;

    const a = this.http.get<User[]>(turl);
    return this.http.get<User[]>(turl);
  }


  // getStudents(tdatabase: string): Observable<Student[]> {
  getStudents(tdatabase: string): Observable<Student[]> {
    let turl = `${this.UrlgetStudents}`;
    // turl = turl + '/university02';
    turl = turl + '/' + tdatabase;
    //alert('turl je '+turl);
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  getStudentsPage(tdatabase: string, tstartindex: string, tendindex: string, torder: string, twhere: string): Observable<Student[]> {
    let turl = `${this.UrlGetStudentPage}`;
    turl = turl + tdatabase;
    turl = turl + '/' + tstartindex;
    turl = turl + '/' + tendindex;
    turl = turl + '/' + torder;
    turl = turl + '/' + twhere;

    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  dajMaksIdStud(tdatabase: string): Observable<Dummy[]> {
    let turl = `${this.UrlgetMaxID}`;
    turl = turl +  tdatabase;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  dajCountStud(tdatabase: string): Observable<Dummy[]> {
    let turl = `${this.UrlgetCountN}`;
    turl = turl  + tdatabase;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  dodajStudentaUBazu(tdatabase: string, id: number): Observable<Dummy[]> {
    let turl = this.UrladdStudent;
    turl = turl  + tdatabase;
    turl = turl + '/' + id.toString();

    const a = this.http.get<Dummy[]>(turl);
    return this.  http.get<Dummy[]>(turl);
  }

  brisiStudenta(tdatabase: string, id: number): Observable<Dummy[]> {
    let turl = this.UrlBrisiStudent;
    turl = turl  + tdatabase;
    turl = turl + '/' + id.toString();

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  uzmiStudenta(id: number, tdatabase: string): Observable<Student[]> {
    let turl = `${this.UrlGetStudent}${id}`;
    turl = turl + '/' + tdatabase;
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  updejtajStudenta(id: number, code: string, prezime: string, ime: string, address: string, email: string, age: number, vreme: string,  tdatabase: string ): Observable<Dummy[]> {

    // alert('updejtajStudenta n');
    if (address === '') { address = ' '; }
    if (vreme === '') { vreme = ' '; }

    let turl = `${this.UrlUpdateStudent}${id}`;
    turl = turl + '/' + code;
    turl = turl + '/' + prezime;
    turl = turl + '/' + ime;
    turl = turl + '/' + address;
    turl = turl + '/' + email;
    turl = turl + '/' + age;
    turl = turl + '/' + vreme;
    turl = turl + '/' + tdatabase;
    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);

  }

  uploadFile(ttekst: string): Observable<Dummy[]> {
    let turl = `${this.UrlUpload}`;
    turl = turl +  ttekst;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  // provjeri(): Observable<Dummy[]> {
  //   let turl = `${this.UrlDaliradi}`;
  //   turl = turl;
  //
  //   const a = this.http.get<Dummy[]>(turl);
  //   return this.http.get<Dummy[]>(turl);
  // }

  provjeri(tdatabase: string): Observable<Dummy[]> {
  // provjeri(): Observable<Dummy[]> {
    let turl = `${this.UrlDaliradi}`;
    // let turl = `${this.UrlgetMaxID}`;
    turl = turl +  tdatabase;
    turl = turl ;

    // let params = new HttpParams();
    // params = params.append('var1', 'aa'');
    // params = params.append('var2', 'bb');
    let params = new HttpParams();
    params = params.set('id', 'someid');
    params = params.set('name', 'johndoe');
    params = params.set('tdatabase', 'baza000');

    // let params = new HttpParams();
    // const actors = ['Elvis', 'Jane', 'Frances'];
    // params.append('actors', JSON.stringify(actors));

    this.http.get<Dummy[]>(turl, { params });

    // const a = this.http.get<Dummy[]>(turl,{ params } );
    // return this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl, { params });
  }


  provjeri3(): Observable<Dummy[]> {
    // provjeri(): Observable<Dummy[]> {
    let turl = `${this.UrlDaliradi3}`;
    // let turl = `${this.UrlgetMaxID}`;
    // turl = turl +  tdatabase;
    turl = turl ;

    // let params = new HttpParams();
    // params = params.append('var1', 'aa'');
    // params = params.append('var2', 'bb');
    let params = new HttpParams();
    params = params.set('id', 'someid');
    params = params.set('FirstName', 'johndoe29');
    params = params.set('tdatabase', 'baza000');

    // let params = new HttpParams();
    // const actors = ['Elvis', 'Jane', 'Frances'];
    // params.append('actors', JSON.stringify(actors));

    this.http.get<Dummy[]>(turl, { params });
    // this.http.get<Dummy[]>(turl);

    // const a = this.http.get<Dummy[]>(turl, params);

    // const stringparams = 'name=iphone';
    // const params2 = new HttpParams({fromString: stringparams});
    // const options = { params };
    // const b = this.http.get<Dummy[]>(turl, options)

    // this.http.get<Dummy[]>(turl, options);

    // return this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl, { params });

    //return this.http.get<Dummy[]>(turl, options);
  }



  updejtajStudenta2(  tdatabase: string ): Observable<Dummy[]> {

    // let ttype = typeof(this.selectedStudent);
    // alert (ttype);

   let tid = this.selectedStudent.id;
   let b = this.selectedStudent.FirstName;
   let c = this.selectedStudent.LastName;

   for (const [key, value] of Object.entries(this.selectedStudent)) {
      console.log(key, value);
   }

    // if (address === '') { address = ' '; }
    // if (vreme === '') { vreme = ' '; }

   let params = new HttpParams();
   // params = params.set('id', this.selectedStudent.id);
   // params = params.set('FirstName', this.selectedStudent.FirstName);
   // params = params.set('LastName', this.selectedStudent.LastName);

   for (const [key, value] of Object.entries(this.selectedStudent)) {
   //    console.log(key, value);
   //  for (const key of this.selectedStudent) {

     // if (key === 'id') {
     //   params = params.set(key, this.selectedStudent.id);
     // }
     // if (key === 'FirstName') {
     //   params = params.set(key, this.selectedStudent.FirstName);
     // }
     // if (key === 'LastName') {
     //   params = params.set(key, this.selectedStudent.LastName);
     // }

     // TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!
     params = params.set(key, this.selectedStudent[key]);

   }


   alert('updejtajStudenta 1 ' );
    //
   let turl = `${this.UrlUpdateStudent2}${tdatabase}`;
   turl = turl + '/' + tid;

   alert('updejtajStudenta ' + turl);

    // turl = turl + '/' + code;
    // turl = turl + '/' + prezime;
    // turl = turl + '/' + ime;
    // turl = turl + '/' + address;
    // turl = turl + '/' + email;
    // turl = turl + '/' + age;
    // turl = turl + '/' + vreme;
    // turl = turl + '/' + tdatabase;
    // const a = this.http.get<Dummy[]>(turl);
   return this.http.get<Dummy[]>(turl, { params });

  }


  // TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!
  updejtajRedak(tobject: object, tdatabase: string, ttablica: string, tid: string ): Observable<Dummy[]> {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(tobject)) {

      params = params.set(key, tobject[key]);

    }

    // let tid2  = this.selectedStudent.id;
    // let tid2  = tobject.id;

    let turl = `${this.UrlUpdateStudent2}${tdatabase}`;
    turl = turl + '/' + tid;

    return this.http.get<Dummy[]>(turl, { params });
  }



  bazapostoji(tdatabase: string): Observable<Dummy[]> {
      // let turl = `${this.UrlBazaPostoji}`;
      // turl = turl + tdatabase;
      //
      // return this.http.get<Dummy[]>(turl);

    let turl = `${this.UrlgetCountN}`;
    turl = turl  + tdatabase;

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);

  }

}

// this.http.get<Dummy[]>(turl, { params });

