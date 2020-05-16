import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from '../toastr.service';
import {config } from "../../config";
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  form: FormGroup;
  urlPort = config.urlPort;
  constructor(private fb: FormBuilder,private http: Http,private toastr:ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      subject: [null, Validators.compose([Validators.required, Validators.pattern("[A-Za-z ]{1,80}")])],
      body: [null, Validators.compose([Validators.required, Validators.pattern("[A-Za-z0-9 ,.]{1,100}")])],
      email: [null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])],
  });
}

//Send Mail Details
formSubmit(data) {
  data.jsonBody = JSON.parse(localStorage.getItem("mailBody"))
  this.http.post(this.urlPort + "/api/mail/sendEmail", data)
      .catch((err) => {
        this.toastr.Error("Email has not sent")
        return Observable.throw(err)
      })
      .subscribe(uploadRes => {
        this.toastr.Success("Email has successfully send")
       
    });

}
}
