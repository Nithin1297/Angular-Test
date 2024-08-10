import { Injectable } from '@angular/core';

export type Iproduct = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
  qty: number;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  q!: number;
  id!: string;
  cart: Array<Iproduct> = [];

  addProductP(item: Iproduct) {
    // Check if the available quantity is greater than 0
    if (item.quantity <= 0) {
      console.error(`Cannot add ${item.name} to cart. Out of stock.`);
      return;
    }

    const existingItem = this.cart.find((i) => item.id === i.id);
    if (existingItem) {
      existingItem.qty += 1; // Increase quantity in cart
    } else {
      this.cart.push({ ...item, qty: 1 }); // Add new item to cart
    }
  }

  removeFromCart(item: Iproduct) {
    const cartItem = this.cart.find((i) => i.id === item.id);
    if (cartItem) {
      cartItem.qty -= 1; // Decrease quantity in cart
      if (cartItem.qty === 0) {
        this.cart = this.cart.filter((i) => i.id !== item.id); // Remove item from cart if qty is 0
      }
    }
  }

  updateProductQuantity(productId: string, quantity: number): Promise<any> {
    return fetch(`https://66b0a87f6a693a95b539a6fd.mockapi.io/Products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }

  getDataP(): Promise<Iproduct[]> {
    return fetch('https://66b0a87f6a693a95b539a6fd.mockapi.io/Products').then(
      (res) => res.json()
    );
  }

  getProductByIdP(productId: string): Promise<Iproduct> {
    return fetch(
      `https://66b0a87f6a693a95b539a6fd.mockapi.io/Products/${productId}`
    ).then((res) => res.json());
  }

  orders: Array<Iproduct> = [];

  addOrder(orderDetails: any): Promise<any> {
    return this.postOrderToApi(orderDetails);
  }

  postOrderToApi(orderDetails: any): Promise<any> {
    return fetch('https://66b0a87f6a693a95b539a6fd.mockapi.io/Orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((order) => {
        // Update product quantities in the API after the order is placed
        orderDetails.items.forEach((item: Iproduct) => {
          this.updateProductQuantity(item.id, item.quantity - item.qty);
        });
        return order;
      });
  }

  getOrdersP(): Promise<Iproduct[]> {
    return fetch('https://66b0a87f6a693a95b539a6fd.mockapi.io/Orders').then(
      (res) => res.json()
    );
  }

  constructor() {}
}
