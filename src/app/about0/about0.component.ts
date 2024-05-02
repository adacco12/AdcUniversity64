import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about0',
  templateUrl: './about0.component.html',
  styleUrls: ['./about0.component.css']
})
export class About0Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  funkcija(): void {
    alert('funkcija');

    //Task: fix makeSquareFns function to show correct answer

    var arr = [ Math.random(), Math.random(), Math.random(), Math.random() ];
    var square = function (x) { return x * x; };

    var fns = [];
    function makeSquareFns(arr, square) {
      // var fns = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        // fns.push(function() {
        //   return square(arr[i]);
        // });
        fns.push(square(arr[i]));
      }
      return fns;
    }

    var funcs = makeSquareFns(arr, square);

    var isEqual = true;
    for (var i = 0; i < arr.length; i++) {
      // if (funcs[i]() !== square(arr[i])) {
      if (fns[i] !== square(arr[i])) {
        isEqual = false;
        alert('wrong answer');
        break;
      }
    }
    if (isEqual) alert('correct answer');

  }

  // https://www.upwork.com/o/jobs/browse/details/~0158ff3639dfe243b4/?q=angular&sort=recency
  //https://jsfiddle.net/ofydumrz/

 // https://www.upwork.com/jobs/~0158ff3639dfe243b4
}
