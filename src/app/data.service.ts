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
  cart: Array<Iproduct> = [];
  addProductP(item: Iproduct) {
    if (this.cart.find((i) => item.id == i.id)) {
      const idx = this.cart.indexOf(item);
      item.qty += 1;
    } else {
      this.cart.push(item);
    }
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
    this.orders.push(orderDetails);
    return this.postOrderToApi(orderDetails);
  }

  postOrderToApi(orderDetails: any): Promise<any> {
    return fetch('https://66b0a87f6a693a95b539a6fd.mockapi.io/Orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }

  getOrdersP(): Promise<Iproduct[]> {
    return fetch('https://66b0a87f6a693a95b539a6fd.mockapi.io/Orders').then(
      (res) => res.json()
    );
  }

  constructor() {}
}
