import { Injectable } from '@angular/core';

export type Iproduct = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  cart: Array<Iproduct> = [];
  addProductP(item: Iproduct) {
    this.cart.push(item);
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

  constructor() {}
}
