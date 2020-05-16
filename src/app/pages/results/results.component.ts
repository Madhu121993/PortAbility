import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import {config } from "../../config";
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private http: Http,private router: Router) { }
fileName;
data;
max:any;
min:any;
average:any;
conversionRate:any;
urlPort = config.urlPort;
  ngOnInit() {
    this.fileName = this.route.snapshot.paramMap.get('fileName');
   if(this.fileName != null && this.fileName!= undefined && this.fileName != ''){
    this.http.get(this.urlPort + "/api/currencyDetails/getConvertedCurrencyValue?fileName="+this.fileName)
    .map(
      (response) => response.json()
    )
      .catch((err) => {
        return Observable.throw(err)
      })
      .subscribe(response => {
       this.data = response.usdValues;
       localStorage.setItem("mailBody",JSON.stringify(this.data));
       this.max = response.max
       this.min = response.min
       this.average = response.average
       this.conversionRate = response.conversionRate
    });
   }
    
  }
  routerLink(){
    this.router.navigate(["/pages/email"])
  }

}
