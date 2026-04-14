import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SignInCommandHandler, SignInGoogleCommandHandler, SignInGoogleRequest } from '@application/commands';
import { SignInRequest } from '@application/messages';
import { ViewContext, ViewDataType } from '@view/base';

@Injectable()
export class LoginContext extends ViewContext {
  private signInHandler = inject(SignInCommandHandler);
  private signInGoogleHandler = inject(SignInGoogleCommandHandler);
  private router = inject(Router);

  public errorMessage = signal<string | null>(null);

  // Implement abstract members for ViewContext (Not strictly used for auth forms)
  public override setActiveItem(item: ViewDataType): void {}
  public override getActiveItem(filter?: ViewDataType): ViewDataType {
    return null;
  }
  public override getViewData(filter?: ViewDataType): ViewDataType | ViewDataType[] {
    return null;
  }

  public login(request: SignInRequest): void {
    this.errorMessage.set(null);
    
    // Instead of executeRequest, we just use the handler directly
    // but we can utilize the base view loading signals so we don't duplicate isLoading.
    this.setViewState('LOADING');
    
    this.signInHandler.handle(request).subscribe({
      next: (res) => {
        this.setViewState('LOADED');
        this.storage.set('ADMIN_SESSION', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.setViewState('ERROR');
        const serverMessage = err.error?.message || 'Unauthorized or network error';
        this.errorMessage.set(serverMessage);
      }
    });
  }

  public googleLogin(googleUser: any): void {
    this.errorMessage.set(null);
    this.setViewState('LOADING');
    
    const allowedEmail = 'lcho332002@gmail.com';
    if (googleUser.email !== allowedEmail) {
      this.setViewState('ERROR');
      this.errorMessage.set('Unauthorized: Access restricted to authorized portal administrators only.');
      return;
    }

    const googleRequest = new SignInGoogleRequest();
    googleRequest.email = googleUser.email;
    googleRequest.fullName = googleUser.name;
    googleRequest.avatarUrl = googleUser.picture;

    this.signInGoogleHandler.handle(googleRequest).subscribe({
      next: (res) => {
        this.setViewState('LOADED');
        this.storage.set('ADMIN_SESSION', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.setViewState('ERROR');
        this.errorMessage.set(err.error?.message || 'Login failed on the server');
      }
    });
  }
}
