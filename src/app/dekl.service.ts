import { Injectable } from '@angular/core';
import {Student} from './student.service';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class Dekl {
  role: string = 'test';

  tbroj: number = 0;
  tidstud: number = 0;
  tekst1 = 'ok1';
  tekst2 = '';
  tekst3 = '';
  tekst4 = '';

  ulogovan = false;
}

