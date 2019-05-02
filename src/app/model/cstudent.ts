export class Cstudent {
  IdStud: number;
  Code: string;
  FirstName: string;
  LastName: string;
  Email: string;

  Red_br: number;
  EnrDate: string;
  Address: string;
  Age: string;
  AdresaSlike: string;

  constructor(IdStud: number, Code: string, FirstName: string, LastName: string, Email: string, Red_br: number, EnrDate: string, Address: string, Age: string){

    this.IdStud = IdStud;
    this.Code = Code;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;

    this.Red_br = Red_br;
    this.EnrDate = EnrDate;
    this.Address = Address;
    this.Age = Age;
    this.AdresaSlike = '';

  }

}

