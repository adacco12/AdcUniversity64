import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Student {

  IdStud: number;
  Code: string;
  FirstName: string;
  LastName: string;
  Email: string;

  Red_br: number;
  EnrDate: string;
  Address: string;
  Age: string;

  id: string;
}
