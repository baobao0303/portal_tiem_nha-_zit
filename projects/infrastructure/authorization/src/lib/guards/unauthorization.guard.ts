import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BROWSER_STORAGE } from '@infrastructure/base';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizationGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly storage = inject(BROWSER_STORAGE);

  /**
   * Checks whether the admin is NOT logged in.
   * If logged in, redirects away from the given route (e.g., login) towards the dashboard.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const adminSession = this.storage.get('ADMIN_SESSION');
    if (adminSession) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
