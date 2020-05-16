import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
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
    private router: Router
  ) {}

  ngOnInit() {

    // select option of stock exchange
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
    // select option of limit
    this.limits = [
      {
        limit: 5
      },
      {
        limit: 10
      }
    ];

    // Get data based on NASDAQ
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
 // Get data based on selection of stock exchange
  selectedExchange(event) {
    this.exchange = event.target.value;
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

  // Get data based on selection of limit
  selectedLimit(event) {
    this.limit = Number(event.target.value);
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

// download Statement
  generateCustomLink(value) {
    return (
      "https://financialmodelingprep.com/api/v3/financials/income-statement/" +
      value +
      "?datatype=csv"
    );
  }

  // filter data based on name
  getData(val) {
    this.searchVal = val;
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
