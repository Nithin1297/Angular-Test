import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const auth = JSON.parse(localStorage.getItem('token') ?? 'false') as boolean;

  if (!auth) {
    router.navigate(['/']);
  }

  return auth;
};
