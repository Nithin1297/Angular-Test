import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService, Iproduct } from '../data.service';
import { ProductComponent } from '../product/product.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ProductComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  searchForm!: FormGroup;
  addOneProduct(item: Iproduct) {
    return this.dataService.addProductP(item);
  }
  allProducts: Array<Iproduct> = [];
  isLoading: boolean = true;
  msg = '';
  constructor(private fb: FormBuilder, public dataService: DataService) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }
  trackById(index: number, product: Iproduct): string {
    return product.productId;
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.dataService
      .getDataP()
      .then((data) => {
        this.allProducts = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong 🥲';
      });
  }
}
