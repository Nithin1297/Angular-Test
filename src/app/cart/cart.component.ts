import { Component, Input } from '@angular/core';
import { DataService, Iproduct } from '../data.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() allItems: Array<Iproduct> = [];
  constructor(public dataService: DataService) {
    this.allItems = dataService.cart;
  }
  total = 0;
  // for(item of allItems){
  //   this.total += item.price
  // }
}
