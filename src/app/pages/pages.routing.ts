import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const pagesRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'home',
          component: HomePageComponent
        }
      ]
    }
  ];