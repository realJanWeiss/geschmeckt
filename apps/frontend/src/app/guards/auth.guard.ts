import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot): Promise<boolean> {
    const loggedIn = await this.authService.isLoggedIn();
    if (next.routeConfig?.path === 'welcome') {
      if (loggedIn) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    }
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
