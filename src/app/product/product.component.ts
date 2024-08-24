import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DataService, Iproduct } from '../data.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { Router } from 'express';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatTooltipModule,
    CurrencyPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private router: Router) {
    this.isLoggedIn = this.checkToken();
  }
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  isLoggedIn: boolean;

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  @Output() addItemEvent: EventEmitter<Iproduct> = new EventEmitter<Iproduct>();

  addToCart() {
    this.addItemEvent.emit(this.product);
    this.isLoggedIn
      ? this.openSnackBar('Item added to cart 🥳', 'Yay')
      : this.openSnackBar('Please Login 🙂', 'ok');
  }

  @Output() deleteProductEvent: EventEmitter<Iproduct> =
    new EventEmitter<Iproduct>();
  @Input() product: Iproduct = {
    productId: '1',
    name: 'Wireless Headphones',
    type: 'Electronics',
    description:
      'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 99.99,
    image:
      'https://images.unsplash.com/photo-1517841905240-47298e0c3e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdpcmVsbGVzcyUyMGhlYWRwaG9uZXxlbnwwfHx8fDE2ODQwMjY3OTg&ixlib=rb-1.2.1&q=80&w=400',
    quantity: 10,
  };
  deleteProduct() {
    this.deleteProductEvent.emit(this.product);
  }
  canEditOrDelete(): boolean {
    const roleId = localStorage.getItem('roleId');
    // const username = localStorage.getItem('username');
    if (roleId) {
      // Parse the stored JSON
      return roleId === '0'; // Return true if roleId is '0'
    }
    return false; // Default to false if no authData
  }
}
