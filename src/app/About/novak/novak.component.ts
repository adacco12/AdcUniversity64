import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novak',
  templateUrl: './novak.component.html',
  styleUrls: ['./novak.component.css']
})
export class NovakComponent implements OnInit {

  public edited = true;

  constructor() { }

  ngOnInit() {
  }

  NovakClick(): void {
    if (this.edited === true) {
      this.edited = false;
    } else {
      this.edited = true;
    }
  }

}
