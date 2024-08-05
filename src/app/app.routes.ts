import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OverviewComponent } from './overview/overview.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'overview/:id',
    component: OverviewComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];
