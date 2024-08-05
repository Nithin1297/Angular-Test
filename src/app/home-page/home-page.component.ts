import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService, Iproduct } from '../data.service';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ProductComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  allProducts: Array<Iproduct> = [];
  isLoading: boolean = true;
  msg = '';
  constructor(public dataService : DataService){}
  
  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.dataService
      .getDataP()
      .then((data) => {
        // console.log(data);
        this.allProducts = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong 🥲';
      });
  }
}
