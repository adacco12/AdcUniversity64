import { Component, OnInit } from '@angular/core';
import {Student} from '../student.service';
import { DbmongoService } from '../dbmongo.service';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  tstudenti: Student[];

  constructor(private mngs: DbmongoService) { }

  ngOnInit() {
    this.mngs
      .getStudents('aaa')
      .subscribe((data: Student[]) => {
        this.tstudenti = data;
      });
  }

}
