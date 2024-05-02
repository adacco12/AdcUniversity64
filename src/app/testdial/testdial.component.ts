import { Component, OnInit,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-testdial',
  templateUrl: './testdial.component.html',
  styleUrls: ['./testdial.component.css']
})


export class TestdialComponent implements OnInit {


  constructor() { }

  @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  parentCall() {
    alert('parent component call.');
    this.parentFun.emit();
  }
}
