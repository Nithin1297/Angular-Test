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
      return total + item.price * item.quantity;
    }, 0);
  }

  total() {
    return;
  }

  ngOnInit() {
    this.dataService.isCartEmpty().then(() => {
      this.allItems = this.dataService.cart; // Assign fetched cart items
      this.calculateGrandTotal(); // Recalculate grand total
    });
    // this.loaditems();
  }

  loaditems() {
    this.router.navigate(['cart']);
  }

  placeOrder() {
    if (!this.validateOrder()) {
      alert(
        'One or more items exceed available stock. Please adjust your quantities.'
      ); // Alert user
      return; // Stop order placement
    }

    const orderDetails = {
      products: this.allItems,
      totalPrice: this.grandTotal,
    };
    console.log(orderDetails);

    this.dataService
      .addOrder(orderDetails)
      .then((response) => {
        console.log('Order placed successfully:', response);
        this.dataService.cart = []; // Clear cart after placing order
        this.calculateGrandTotal(); // Reset grand total
        this.router.navigate(['/orders'], { state: { orderDetails } });
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  }

  validateOrder(): boolean {
    for (const item of this.allItems) {
      if (item.quantity > item.quantity) {
        console.error(
          `Cannot place order. ${item.name} exceeds available stock.`
        );
        return false; // Validation failed
      }
    }
    return true; // Validation passed
  }

  id: number = 1;
  generateOrderId() {
    return (this.id += 1);
  }
}
