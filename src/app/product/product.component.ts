import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Iproduct } from '../data.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product : Iproduct = {
    id: '1',
    name: 'Wireless Headphones',
    type: 'Electronics',
    description:
      'High-quality wireless headphones with noise cancellation and long battery life.',
    price: '99.99',
    image:
      'https://images.unsplash.com/photo-1517841905240-47298e0c3e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdpcmVsbGVzcyUyMGhlYWRwaG9uZXxlbnwwfHx8fDE2ODQwMjY3OTg&ixlib=rb-1.2.1&q=80&w=400',
    quantity: '10',
  };
}
