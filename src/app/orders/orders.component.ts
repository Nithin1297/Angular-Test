import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders: any[] = [];
  isLoading: boolean = true;

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
        this.orders = data;
        this.sortOrdersByRecentDate();
      })
      .then(() => (this.isLoading = false))
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }

  sortOrdersByRecentDate(): void {
    this.orders.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
