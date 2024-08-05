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
      if (existingItem.qty < item.quantity) {
        existingItem.qty += 1;
        this.updateProductQuantity(item.id, --item.quantity);
      } else {
        console.error(
          `Cannot add more of ${item.name} to cart. Maximum quantity reached.`
        );
      }
    } else {
      this.cart.push({ ...item, qty: 1 });
      this.updateProductQuantity(item.id, item.quantity - 1);
    }
  }

  updateProductQuantity(productId: string, quantity: number): Promise<any> {
    return fetch(
      `https://66b0a87f6a693a95b539a6fd.mockapi.io/Products/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      }
    ).then((response) => {
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
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((order) => {
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
