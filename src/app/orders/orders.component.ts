import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.dataService.getOrdersP().then((orders) => {
      this.orders = orders;
    });
  }
}
