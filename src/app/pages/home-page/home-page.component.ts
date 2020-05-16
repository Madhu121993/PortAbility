import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { ToastrService } from "../toastr.service";
import { config } from "../../config";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  options = [];
  data: any;
  urlPort = config.urlPort;
  limit = 5;
  exchange = "NASDAQ";
  limits = [];
  arrayData = [];
  searchVal = "";
  constructor(
    private http: Http,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.options = [
      {
        exchange: "NASDAQ"
      },
      {
        exchange: "NYSE"
      },
      {
        exchange: "AMEX"
      },
      {
        exchange: "FOREX"
      }
    ];
    this.limits = [
      {
        limit: 5
      },
      {
        limit: 10
      }
    ];
    this.http
      .get(
        "https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ"
      )
      .map(response => response.json())
      .catch(err => {
        return Observable.throw(err);
      })
      .subscribe(response => {
        var jsonData = response;
        this.data = jsonData.slice(0, this.limit);
        this.arrayData = jsonData.slice(0, this.limit);
      });
  }

  selectedExchange(event) {
    this.exchange = event.target.value;
    console.log("onChange:", this.exchange);
    this.http
      .get(
        "https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=" +
          this.exchange
      )
      .map(response => response.json())
      .catch(err => {
        return Observable.throw(err);
      })
      .subscribe(response => {
        var jsonData = response;
        this.data = jsonData.slice(0, this.limit);
        console.log("data:", this.data);
        this.arrayData = jsonData.slice(0, this.limit);
        var filteredData = this.arrayData.filter(
          org =>
            org.name != null &&
            org.name.toLowerCase().startsWith(this.searchVal.toLowerCase())
        );
        console.log("filteredData: ", filteredData);
        this.data = filteredData;
        if (this.searchVal == "") {
          this.data = this.arrayData;
        }
      });
  }

  selectedLimit(event) {
    this.limit = Number(event.target.value);
    console.log("this.limit: ", this.limit);
    console.log("this.exchange:", this.exchange);
    this.http
      .get(
        "https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=" +
          this.exchange
      )
      .map(response => response.json())
      .catch(err => {
        return Observable.throw(err);
      })
      .subscribe(response => {
        var jsonData = response;
        this.data = jsonData.slice(0, this.limit);
        this.arrayData = jsonData.slice(0, this.limit);
        console.log("this.data:", this.data);
        console.log("this.searchVal: ", this.searchVal);
        var filteredData = this.arrayData.filter(
          org =>
            org.name != null &&
            org.name.toLowerCase().startsWith(this.searchVal.toLowerCase())
        );
        this.data = filteredData;
        if (this.searchVal == "") {
          this.data = this.arrayData;
        }
      });
  }

  generateCustomLink(value) {
    return (
      "https://financialmodelingprep.com/api/v3/financials/income-statement/" +
      value +
      "?datatype=csv"
    );
  }

  getData(val) {
    this.searchVal = val;
    console.log("this.data:", this.data);
    var filteredData = this.arrayData.filter(
      org =>
        org.name != null &&
        org.name.toLowerCase().startsWith(this.searchVal.toLowerCase())
    );
    this.data = filteredData;
    if (this.searchVal == "") {
      this.data = this.arrayData;
    }
  }
}
