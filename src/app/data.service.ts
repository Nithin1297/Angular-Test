import { Injectable } from '@angular/core';

export type Iproduct = {
  productId: string;
  name: string;
  description: string;
  price: string;
  type: string;
  quantity: number;
  image: string;
  qty: number;
};

export interface User {
  username: string;
  password: string;
}

export interface TokenResponse {
  msg: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // API: string = 'https://node-test-la0a.onrender.com';
  API: string = `http://localhost:4000`;
  q!: number;
  id!: string;
  cart: Array<Iproduct> = [];

  addProductP(item: Iproduct) {
    if (item.quantity <= 0) {
      console.error(`Cannot add ${item.name} to cart. Out of stock.`);
      return;
    }

    const existingItem = this.cart.find((i) => item.productId === i.productId);
    if (existingItem) {
      existingItem.qty += 1; // Increase quantity in cart
    } else {
      this.cart.push({ ...item, qty: 1 }); // Add new item to cart
    }
  }

  removeFromCart(item: Iproduct) {
    const cartItem = this.cart.find((i) => i.productId === item.productId);
    if (cartItem) {
      cartItem.qty -= 1; // Decrease quantity in cart
      if (cartItem.qty === 0) {
        this.cart = this.cart.filter((i) => i.productId !== item.productId); // Remove item from cart if qty is 0
      }
    }
  }

  async updateProductQuantity(
    productId: string,
    quantity: number
  ): Promise<any> {
    return await fetch(`${this.API}/products/${productId}`, {
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

  async getDataP(): Promise<Iproduct[]> {
    return await fetch(`${this.API}/products`).then((res) => res.json());
  }

  async getProductByIdP(productId: string): Promise<Iproduct> {
    return await fetch(`${this.API}/products/${productId}`).then((res) =>
      res.json()
    );
  }

  orders: Array<Iproduct> = [];

  addOrder(orderDetails: any): Promise<any> {
    return this.postOrderToApi(orderDetails);
  }

  async postOrderToApi(orderDetails: any): Promise<any> {
    return await fetch(`${this.API}/orders`, {
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
          this.updateProductQuantity(item.productId, item.quantity - item.qty);
        });
        return order;
      });
  }

  async getOrdersP(): Promise<any> {
    return await fetch(`${this.API}/orders/9861fc18-6fc5-4fe4-b324-50ea96bd8d29getting oeder `).then((res) => res.json());
  }

  async login(credentials: User): Promise<TokenResponse> {
    return await fetch(`${this.API}/users/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  constructor() {}
}
