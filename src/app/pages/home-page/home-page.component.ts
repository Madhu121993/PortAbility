import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from '../toastr.service';
import {config } from "../../config";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  file;
  fileName;
  fd;
  urlPort = config.urlPort;
  constructor(private http: Http, private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
  }

  //upload file
  uploadedFile(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name
    if (this.file != undefined && this.file != '' && this.file != null) {
      this. fd = new FormData();
      this.fd.append('file', this.file, this.file['name']);
      this.http.post(this.urlPort + "/api/file/upload", this.fd)
      .catch((err) => {
        this.toastr.Error("File has not uploaded")
        return Observable.throw(err)
      })
      .subscribe(uploadRes => {
        this.toastr.Success("You have successfully uploaded")
        this.router.navigate(["/pages/result",{fileName:this.fileName}])
    });
    }
}
}
   

  



