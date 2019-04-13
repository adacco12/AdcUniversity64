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


@Injectable({
  providedIn: 'root'
})
export class DbmongoService {
  globv = environment;

  domena = 'localhost';
  // UrlgetStudents = 'http://' + this.domena + ':4001/studenti';
  UrlgetStudents = 'http://' + this.globv.THOST  + ':4001/studenti';
  UrlgetMaxID = 'http://' + this.globv.THOST + ':4001/studenti/getMaxID/';
  UrlgetCountN = 'http://' + this.globv.THOST + ':4001/studenti/getCountN/';
  UrladdStudent = 'http://' + this.globv.THOST + ':4001/studenti/addStudent/';
  UrlGetStudent = 'http://' + this.globv.THOST + ':4001/studenti/GetStudent/';
  UrlUpdateStudent = 'http://' + this.globv.THOST + ':4001/studenti/updateStudent/';

  // private UrlGetStudent = 'http://' + this.globv.THOST + ':8089/api/GetStudent/';

  // private customersUrlgetStudents = 'http://' + this.globv.THOST + ':8089/api/getStudents/';

  constructor(
    private http: HttpClient) { }

  // getStudents(tdatabase: string): Observable<Student[]> {
  getStudents(tdatabase: string): Observable<Student[]> {
    let turl = `${this.UrlgetStudents}`;
    // turl = turl + '/university02';
    turl = turl + '/' + tdatabase;
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  // uzmiStudenta(id: number, tdatabase: string): Observable<Student[]> {
  //   let turl = `${this.UrlGetStudent}${id}`;
  //   turl = turl + '/' + tdatabase;
  //   const a = this.http.get<Student[]>(turl);
  //   return this.http.get<Student[]>(turl);
  // }

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
    //let turl = `${this.UrladdStudent}`;
    let turl = this.UrladdStudent;
    turl = turl  + tdatabase;
    turl = turl + '/' + id.toString();

    // let turl = 'http://' + this.globv.THOST +  ':4001/student/addStudent/';
    // turl = turl +  tdatabase;
    // turl = turl + '/' + id.toString();

    const a = this.http.get<Dummy[]>(turl);
    return this.http.get<Dummy[]>(turl);
  }

  uzmiStudenta(id: number, tdatabase: string): Observable<Student[]> {
    let turl = `${this.UrlGetStudent}${id}`;
    turl = turl + '/' + tdatabase;
    const a = this.http.get<Student[]>(turl);
    return this.http.get<Student[]>(turl);
  }

  updejtajStudenta(id: number, code: string, prezime: string, ime: string, address: string, email: string, age: number, vreme: string ): Observable<Dekl[]> {

    // alert('updejtajStudenta n');
    if (address === '') { address = ' '; }

    let turl = `${this.UrlUpdateStudent}${id}`;
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



}
