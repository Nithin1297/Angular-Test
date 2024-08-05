import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OverviewComponent } from './overview/overview.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'overview/:id',
    component: OverviewComponent,
  },
];
