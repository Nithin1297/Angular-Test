import { Injectable } from '@angular/core';

export type Iproduct = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: string;
  quantity: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getDataP(): Promise<Iproduct[]> {
    throw new Error('Method not implemented.');
  }

  constructor() {}
}
