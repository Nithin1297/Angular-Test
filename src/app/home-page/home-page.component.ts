import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService, Iproduct } from '../data.service';
import { ProductComponent } from '../product/product.component';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, switchMap, catchError, of, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ProductComponent,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
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

  deleteProductP(product: Iproduct) {
    this.dataService
      .deleteProduct(product)
      .then(() => {
        this.ngOnInit();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        this.msg = 'Failed to delete product.';
      });
  }

  trackById(index: number, product: Iproduct): string {
    return product.productId;
  }

  ngOnInit() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((searchTerm) =>
          this.dataService.searchUser(searchTerm).pipe(
            catchError((error) => {
              console.log(error);
              return of([]);
            })
          )
        )
      )
      .subscribe((data) => {
        // console.log(data);
        this.isLoading = false;
        this.allProducts = data;
        this.isLoading = false;
      });
    localStorage.getItem('token') != undefined ||
    localStorage.getItem('token') != null
      ? (this.dataService.isToken = true)
      : (this.dataService.isToken = false);
  }
}
