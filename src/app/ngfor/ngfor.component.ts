import {Component, Inject, OnInit, AfterViewInit} from '@angular/core';
import { DbmongoService } from '../dbmongo.service';
import {environment} from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {Student} from '../student.service';
import {Router} from '@angular/router';
import {Dummy} from '../dummy.service';
import {Dekl} from '../dekl.service';
import {EMPTY} from 'rxjs';

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
    public tstdnt: Student
  ) { }

  ngOnInit() {
    if (this.storage.get('member_name') ===  null) {
      this.router.navigate(['notlogged']);
      return;
    }

    this.ttImeMdb = this.storage.get('ime_mdb');
    //this.filter = '';
    this.tval = '45';

    this.generate3();

    setTimeout(() => { this.filter = ''; }, 350);
  }

  ngAfterViewInit (): void  {

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
        const a = 0;

        datagStudentiGrid = JSON.parse(string);
        const c = 0;
      });
  }

}
