import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nadal',
  templateUrl: './nadal.component.html',
  styleUrls: ['./nadal.component.css']
})
export class NadalComponent implements OnInit {

  public edited = true;

  constructor() { }

  ngOnInit() {
  }

  NadalClick(): void {
    if (this.edited === true) {
      this.edited = false;
    } else {
      this.edited = true;
    }
  }

}
