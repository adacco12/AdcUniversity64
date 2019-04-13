import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {HttpClient} from '@angular/common/http';

import { environment } from '../../environments/environment';

const domena = 'www.adacco.com';
// -const domena = 'localhost';
let URL = 'http://' + domena + ':3000/api/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  globv = environment;

  // public URL2 = URL + '/' + 'zec' + '/' + this.globv.tSlikaFile ;
  public URL2 = URL + '/' + this.globv.tSlikeDir + '/' + this.globv.tSlikaFile + '/' + this.globv.tidstud + '/' + this.globv.tIMEMDB;

  public uploader: FileUploader = new FileUploader({url: this.URL2, itemAlias: 'photo'});

  tmessage: string = 'Choose a file to upload.';
  tserviceenebled = true;

  public odg: any;

  constructor(
    // private mainService: MainService
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.http.get('http://' + domena + ':3000/api/check', {responseType: 'text'})
      .subscribe((data) => {
        this.odg = data;
        // alert ('1.1');
        // alert('to je ' + this.odg[0].a);
        const a = ' -www 15 ';
        // alert(data.toString() + a);

        if (data.toString() === 'radi') {
          this.tserviceenebled = true;
          this.radimo();
        } else {
          // alert(' ne radimo');
          this.tmessage = 'Service not available.';
          this.tserviceenebled = false;
        }

      }, (err) => {
        // console.log(err);
        // alert('greska -  ne radimo');
        this.tmessage = 'Service not available.';
        this.tserviceenebled = false;
      });

  }

  public radimo(): void {
    // alert('radimo');
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      // alert('File uploaded successfully');

      this.tmessage = 'File uploaded successfully';
    };
  }


}

