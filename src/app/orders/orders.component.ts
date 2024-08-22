import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'], // Corrected to 'styleUrls'
})
export class OrdersComponent {
  orders: any[] = []; // Initialize as an empty array
  isLoading: boolean = true

  constructor(private dataService: DataService, private router: Router) {
    this.isLoggedIn = this.checkToken();
  }
  isLoggedIn: boolean;

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.dataService
      .getOrdersP()
      .then((data) => {
        this.orders = data; // Assign the entire response to orders
        // console.log(this.orders); // Debugging to ensure data is fetched correctly
      })
      .then(() => this.isLoading = false)
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }
}
