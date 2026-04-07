import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BROWSER_STORAGE } from '@infrastructure/base';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly storage = inject(BROWSER_STORAGE);

  /**
   * Redirects the user to the sign-in page.
   *
   * @private
   */
  private redirectToSignIn(): boolean {
    this.router.navigateByUrl('/login');
    return false;
  }

  /**
   * Checks whether the admin is authorized to access the dashboard.
   *
   * @param route The route being accessed.
   * @param state The current router state.
   * @returns Promise<boolean> | boolean Whether the route can be activated.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const adminSession = this.storage.get('ADMIN_SESSION');
    if (!adminSession) {
      return this.redirectToSignIn();
    }
    return true;
  }
}
