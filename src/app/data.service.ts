import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Iproduct = {
  productId: string;
  name: string;
  description: string;
  price: number;
  type: string;
  quantity: number;
  image: string;
  // quantity: number;
};

export interface User {
  username: string;
  password: string;
}

export interface TokenResponse {
  msg: string;
  token: string;
  username: string;
  roleId: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  API: string = 'https://node-test-la0a.onrender.com';
  // API: string = `http://localhost:4000`;
  q!: number;
  id!: string;
  cart: Array<Iproduct> = [];
  loginSuccessful: boolean = false;
  isToken!: boolean;
  isName:string = localStorage.getItem('username') ?? ''

  async isCartEmpty() {
    if (localStorage.getItem('token')) {
      return await fetch(`${this.API}/cart`, {
        headers: {
          'x-auth-token': localStorage.getItem('token') as string,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.cart = data[0].products; // Update the cart directly
          // console.log(this.cart);
        })
        .catch((error) => {
          // console.error('Error fetching cart:', );
        });
    } else {
      return;
    }
  }

  async deleteProduct(product: Iproduct) {
    return await fetch(`${this.API}/products/${product.productId}`, {
      method: 'Delete',
    }).then((res) => res.json());
  }

  async addProductP(item: Iproduct) {
    if (item.quantity <= 0) {
      console.error(`Cannot add ${item.name} to cart. Out of stock.`);
      return;
    }

    const existingItem = this.cart.find((i) => item.productId === i.productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
      await fetch(`${this.API}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') as string,
        },
        body: JSON.stringify(this.cart),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    }
  }

  async removeFromCart(item: Iproduct) {
    const cartItem = this.cart.find((i) => i.productId === item.productId);
    if (cartItem) {
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        this.cart = this.cart.filter((i) => i.productId !== item.productId); // Remove item from cart if quantity is 0
      }
      await fetch(`${this.API}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') as string,
        },
        body: JSON.stringify(this.cart),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    }
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
    return await fetch(`${this.API}/orders/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') as string,
      },
      // body: JSON.stringify(orderDetails),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  }

  // userIdOnOrder: string = '9861fc18-6fc5-4fe4-b324-50ea96bd8d29';
  async getOrdersP(): Promise<any> {
    // this userId is coming as response to the cart comp
    if (localStorage.getItem('token')) {
      return await fetch(`${this.API}/orders/`, {
        headers: {
          'x-auth-token': localStorage.getItem('token') as string,
        },
      }).then((res) => res.json());
    } else {
      return;
    }
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

  async signUp(credentials: User): Promise<TokenResponse> {
    return await fetch(`${this.API}/users/signup`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  searchUser(searchTerm: string) {
    return this.http.get<Iproduct[]>(
      `${this.API}/products?search=${searchTerm}`
    );
  }

  constructor(private http: HttpClient) {}
}
