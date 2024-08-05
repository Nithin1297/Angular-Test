import { Component, Input } from '@angular/core';
import { DataService, Iproduct } from '../data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  removeFromCart(itemId: string) {
    return this.allItems.splice(+itemId, 1);
    this.loaditems();
  }
  placeOrder() {
    return;
  }
  @Input() allItems: Array<Iproduct> = [];
  constructor(public dataService: DataService, private router: Router) {
    this.allItems = dataService.cart;
  }
  total(){
    return 
  }

  ngOnInit() {
    this.loaditems();
  }

  loaditems() {
    this.router.navigate(['cart']);
  }
}
