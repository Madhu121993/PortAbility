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
  
  urlPort = config.urlPort;
  constructor(private http: Http, private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
  }

 
}
   

  



