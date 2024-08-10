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
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  grandTotal: number = 0;
  removeFromCart(item: Iproduct) {
    this.dataService.removeFromCart(item);
    this.calculateGrandTotal(); // Recalculate grand total after removal
  }

  @Input() allItems: Array<Iproduct> = [];
  constructor(public dataService: DataService, private router: Router) {
    this.allItems = dataService.cart;
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = this.allItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.qty;
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
      total: this.grandTotal,
      orderId: this.generateOrderId(),
      date: new Date().toLocaleString(),
    };
  
    this.dataService.addOrder(orderDetails).then((response) => {
      console.log('Order placed successfully:', response);
      this.router.navigate(['/orders'], { state: { orderDetails } });
    }).catch((error) => {
      console.error('Error placing order:', error);
    });
  }
  
  id: number = 1;
  generateOrderId() {
    return (this.id += 1);
  }

 
}
