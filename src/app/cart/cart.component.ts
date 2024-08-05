import { Component, Input } from '@angular/core';
import { DataService, Iproduct } from '../data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, MatIconModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  grandTotal: number = 0;
  removeFromCart(item: Iproduct) {
    const idx = this.allItems.indexOf(item);
    return this.allItems.splice(idx, 1);
    this.loaditems();
  }

  @Input() allItems: Array<Iproduct> = [];
  constructor(public dataService: DataService, private router: Router) {
    this.allItems = dataService.cart;
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = this.allItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.qty);
    }, 0);
  }

  total() {
    return;
  }

  ngOnInit() {
    this.loaditems();
  }

  loaditems() {
    this.router.navigate(['cart']);
  }

  placeOrder() {
    const orderDetails = {
      items: this.allItems,
      total: this.total(),
      orderId: this.generateOrderId(),
      date: new Date().toLocaleString(),
    };

    this.dataService.addOrder(orderDetails);
    this.router.navigate(['/orders'], { state: { orderDetails } });
  }

  generateOrderId() {
    // Generate a unique order ID
    return Math.random().toString(36).substring(2, 10);
  }
}
