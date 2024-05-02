import {Inject, Injectable} from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { PagedData } from './model/paged-data';
import { Page } from './model/page';
import { Cstudent } from './model/cstudent';
import { Student } from './student.service';

import * as $ from 'jquery';
import { environment } from '../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PagedMongoService {

  globv = environment;
  UrlgetCountN = 'http://' + this.globv.THOST + ':4001/studenti/getCountN/';
  UrlGetStudentPage = 'http://' + this.globv.THOST + ':4001/studenti/GetStudentPage/';


  public ttImeMdb = 'AdcUniversity';
  tekCColumnOrderStudentsGrid = 'IdStud';
  tdata: any;

  tstudents: Cstudent[];

  page = new Page();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private http: HttpClient
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
    this.ttImeMdb = this.storage.get('ime_mdb');
  }

  public getResults(page: Page,  tdatabase: string): Observable<PagedData<Cstudent>> {
    return of(this.tstudents).pipe(
      delay(new Date(Date.now() + 50)),
      map(data => this.getPagedData(page, tdatabase)));
  }

  private getPagedData(page: Page, tdatabase: string): PagedData<Cstudent> {
    const pagedData = new PagedData<Cstudent>();
    // page.size = 10;
    page.totalElements = this.ukbroj(tdatabase);
    page.totalPages = page.totalElements / page.size;

    let tot = Math.floor( page.totalPages);
    page.totalPages = tot;
    let ostatak = page.totalPages % page.size;
    if (ostatak > 0) {page.totalPages = page.totalPages + 1; }

    const start = page.pageNumber * page.size;
    const end = Math.min((start + page.size), page.totalElements);
    this.tdata = this.generateData2(start, end, tdatabase);
    pagedData.data = this.tdata;
    pagedData.page = page;
    const a = 0;
    return pagedData;
  }

  ukbroj(tdatabase: string): any {
    const a = this.DajUkbr(tdatabase);
    const uk = a[0].count;
    return uk;
  }

  DajUkbr(tdatabase: string): any[] {
    // let turl = `${this.UrlgetCountN}`;
    let turl = this.UrlgetCountN;
    turl = turl  + tdatabase;

    let i = 0;
    let ukPodaci = [];
    $.ajax({
      url: turl,
      data: {},
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
      error : function (jqXHR, textStatus, errorThrown) {
        alert('error -01 - ' + textStatus + ' ' + errorThrown);
      }
    })
    return ukPodaci;
  }

  generateData2(startindex: number, endindex: number, tdatabase: string): any {
    let tstrwhere = ' WHERE IdStud >-1';

    return this.uzmistudente(tdatabase, startindex, endindex, this.tekCColumnOrderStudentsGrid, tstrwhere);

    // return this.getStudentsPage(tdatabase, startindex.toString(), endindex.toString(), this.tekCColumnOrderStudentsGrid, tstrwhere);
  }
  //
  // getStudentsPage(tdatabase: string, tstartindex: string, tendindex: string, torder: string, twhere: string): Observable<any[]> {
  //   let turl = `${this.UrlGetStudentPage}`;
  //   turl = turl + tdatabase;
  //   turl = turl + '/' + tstartindex;
  //   turl = turl + '/' + tendindex;
  //   turl = turl + '/' + torder;
  //   turl = turl + '/' + 'xx';
  //   // turl = turl + '/' + twhere;
  //
  //   const a = this.http.get<any[]>(turl);
  //   return this.http.get<any[]>(turl);
  // }

  uzmistudente(tdatabase: string, startindex: number, endindex: number, torder: string, twhere: string): any[] {
    let datagStudentiGrid = [];
    // let customersUrlgetStudents = 'http://' + this.globv.THOST + ':8089/api/getStud/';
    // // customersUrlgetStudents = customersUrlgetStudents + this.ttImeMdb;
    // customersUrlgetStudents = customersUrlgetStudents + this.globv.tIMEMDB;
    // customersUrlgetStudents = customersUrlgetStudents + '/' + startindex.toString();
    // customersUrlgetStudents = customersUrlgetStudents + '/' + endindex.toString();
    // customersUrlgetStudents = customersUrlgetStudents + '/' + torder;
    // customersUrlgetStudents = customersUrlgetStudents + '/' + twhere;

      let turl = `${this.UrlGetStudentPage}`;
      turl = turl + tdatabase;
      turl = turl + '/' + startindex.toString();
      turl = turl + '/' + endindex.toString();
      turl = turl + '/' + torder;
      turl = turl + '/' + 'xx';

    $.ajax({
      url: turl,
      cache: false,
      timeout: 5000,
      async: false,
      // data: '{startindex: "' + startindex + '", endindex: "' + endindex + '", orderfield: "' + torder + '", strwhere: "' + twhere + '", imebaze: "' + this.ttImeMdb + '" }',

      success: function (data) {
        // let i = startindex + 1;
        let i = 0;
        $.map(data, function (item) {
          let row = {};
          row['IdStud'] = item.IdStud;
          row['Code'] = item.Code;
          row['FirstName'] = item.FirstName;
          row['LastName'] = item.LastName;
          row['Address'] = item.Address;
          row['Email'] = item.Email;
          row['Age'] = item.Age;
          row['EnrDate'] = item.EnrDate;
          datagStudentiGrid[i] = row;

          i = i + 1;
        });

        // this.rows = datagStudentiGrid;
      },
      failure: function (response) {
        alert(response.d);
      }
    });
    return datagStudentiGrid;
  }

}
