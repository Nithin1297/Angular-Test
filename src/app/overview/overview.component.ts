import { Component } from '@angular/core';
import { DataService, Iproduct } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
 
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,CurrencyPipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  product!: Iproduct;
  msg: string = '';
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') ?? '';

    this.dataService
      .getProductByIdP(id)
      .then((data) => {(this.product = data)})
      .catch(() => {
        this.msg = 'Something went wrong 🥲';
      });
  }

}
