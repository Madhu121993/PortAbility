import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ResultsComponent } from './results/results.component';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routing';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailComponent } from './mail/mail.component';
import { ToastrService } from "./toastr.service";

@NgModule({
  declarations: [HomePageComponent, ResultsComponent, MailComponent],
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
