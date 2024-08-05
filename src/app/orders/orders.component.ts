import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orderDetails: any;

  constructor(private dataService: DataService, private router: Router) {
    this.orderDetails = this.router.getCurrentNavigation()?.extras.state?.['orderDetails']
  }

}
