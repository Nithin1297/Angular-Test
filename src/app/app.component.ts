import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'E-Commerce';
  name!: any;
  constructor(private router: Router, public dataService: DataService) {
    this.checkToken();
  }
  ngOnInit() {
    this.checkToken();
  }
  checkToken() {
    if (
      localStorage.getItem('token') != undefined ||
      localStorage.getItem('token') != null
    ) {
      this.dataService.isToken = true;
      // this.dataService.isName = localStorage.getItem('username') ?? '';
    } else {
      this.dataService.isToken = false;
    }
    // console.log(this.dataService.isToken);
  }

  logout() {
    this.dataService.loginSuccessful = false;
    this.openSnackBar('Logged out Successfully ', 'ok');

    localStorage.clear();
    localStorage.getItem('token') != undefined ||
    localStorage.getItem('token') != null
      ? (this.dataService.isToken = true)
      : (this.dataService.isToken = false);
    // console.log(this.dataService.isToken);
    return this.router.navigate(['']);
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
