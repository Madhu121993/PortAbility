import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routing';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from "./toastr.service";

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(pagesRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[ToastrService]
})
export class PagesModule { }
