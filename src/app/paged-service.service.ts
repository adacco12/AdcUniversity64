import {Inject, Injectable} from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { PagedData } from './model/paged-data';
import { Page } from './model/page';
import { Cstudent } from './model/cstudent';

import * as $ from 'jquery';
import { environment } from '../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class PagedServiceService {
  globv = environment;
  public ttImeMdb = 'AdcUniversity';
  tekCColumnOrderStudentsGrid = 'IdStud';
  tdata: any;

  tstudents: Cstudent[];

  page = new Page();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
    this.ttImeMdb = this.storage.get('ime_mdb');
  }

  public getResults(page: Page): Observable<PagedData<Cstudent>> {
    return of(this.tstudents).pipe(
      delay(new Date(Date.now() + 50)),
      map(data => this.getPagedData(page)));
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
   */

  // this.page.size = 10;
  // // this.page.totalElements = 15; // companyData.length;
  // this.page.totalElements  = this.ukbroj();
  // this.page.totalPages = this.page.totalElements / this.page.size;


  private getPagedData(page: Page): PagedData<Cstudent> {
    const pagedData = new PagedData<Cstudent>();
    // page.size = 10;
    page.totalElements = this.ukbroj();
    // page.totalPages = page.totalElements / page.size;
    //page.totalElements = 722;
    // page.totalPages = 72;
    page.totalPages = page.totalElements / page.size;

    let tot = Math.floor( page.totalPages);
    page.totalPages = tot;
    let ostatak = page.totalPages % page.size;
    if (ostatak > 0) {page.totalPages = page.totalPages + 1; }

    const start = page.pageNumber * page.size;
    const end = Math.min((start + page.size), page.totalElements);
    // for (let i = start; i < end; i++) {
    //   const jsonObj = companyData[i];
    //   const employee = new Cstudent(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
    //   pagedData.data.push(employee);
    // }
    // setTimeout(this.generateData2(start, end), 50);
    // setTimeout(() => { this.tdata = this.generateData2(start, end); }, 350);
    this.tdata = this.generateData2(start, end);
    pagedData.data = this.tdata;
    pagedData.page = page;
    const a = 0;
    return pagedData;
  }

  generateData2(startindex: number, endindex: number): any {
    let tstrwhere = ' WHERE IdStud >-1';

    return this.uzmistudente(startindex, endindex, this.tekCColumnOrderStudentsGrid, tstrwhere);

  }

  uzmistudente(startindex: number, endindex: number, torder: string, twhere: string): any[] {
    let datagStudentiGrid = [];
    let customersUrlgetStudents = 'http://' + this.globv.THOST + ':8089/api/getStud/';
    // customersUrlgetStudents = customersUrlgetStudents + this.ttImeMdb;
    customersUrlgetStudents = customersUrlgetStudents + this.globv.tIMEMDB;
    customersUrlgetStudents = customersUrlgetStudents + '/' + startindex.toString();
    customersUrlgetStudents = customersUrlgetStudents + '/' + endindex.toString();
    customersUrlgetStudents = customersUrlgetStudents + '/' + torder;
    customersUrlgetStudents = customersUrlgetStudents + '/' + twhere;

    $.ajax({
      url: customersUrlgetStudents,
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

  ukbroj(): any {
    const a = this.DajUkbr();
    const uk = a[0].count;
    return uk;
  }

  DajUkbr(): any[] {
    let i = 0;
    let ukPodaci = [];
    $.ajax({
      url: 'http://' + this.globv.THOST + ':8089/api/getCount/',
      data: {timebaze: this.globv.tIMEMDB, Name: 'zeljko', Adresa: 'ilica 4'},
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
      error: function (jqXHR, textStatus, errorThrown) {
        alert('error -01 - ' + textStatus + ' ' + errorThrown);
      }
    })
    return ukPodaci;
  }

}
