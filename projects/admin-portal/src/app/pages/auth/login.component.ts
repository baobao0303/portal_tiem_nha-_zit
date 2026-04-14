import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SignInCommandHandler, SignInGoogleCommandHandler, SignInGoogleRequest } from '@application/commands';
import { SignInRequest } from '@application/messages';
import { BROWSER_STORAGE } from '@infrastructure/base';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    LucideAngularModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor() {
    // Icons are picked in the imports via pick() if possible, 
    // but in v1.0.0 LucideAngularModule.pick() should be used.
  }
  private signInHandler = inject(SignInCommandHandler);
  private signInGoogleHandler = inject(SignInGoogleCommandHandler);
  private router = inject(Router);
  private storage = inject(BROWSER_STORAGE);

  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const request = new SignInRequest();
    request.email = this.loginForm.value.email!;
    request.password = this.loginForm.value.password!;

    this.signInHandler.handle(request).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.storage.set('ADMIN_SESSION', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const serverMessage = err.error?.message || 'Unauthorized or network error';
        this.errorMessage.set(serverMessage);
      }
    });
  }

  public loginWithGoogle(): void {
    const google = (window as any).google;
    if (!google) {
      this.errorMessage.set('Google Login is not available');
      return;
    }

    const client = google.accounts.oauth2.initTokenClient({
      client_id: '414543704522-u2omck5jf8jcvvibme86qnu28tiq2tkv.apps.googleusercontent.com',
      scope: 'openid email profile',
      callback: async (tokenResponse: any) => {
        if (tokenResponse.error) {
          this.errorMessage.set('Google Login failed');
          return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        try {
          // 1. Fetch user info from Google
          const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          const googleUser = await userInfoRes.json();

          // 2. Restriction Check
          const allowedEmail = 'lcho332002@gmail.com';
          if (googleUser.email !== allowedEmail) {
            this.isLoading.set(false);
            this.errorMessage.set('Unauthorized: Access restricted to authorized portal administrators only.');
            return;
          }

          // 3. Authenticate with Backend
          const googleRequest = new SignInGoogleRequest();
          googleRequest.email = googleUser.email;
          googleRequest.fullName = googleUser.name;
          googleRequest.avatarUrl = googleUser.picture;

          this.signInGoogleHandler.handle(googleRequest).subscribe({
            next: (res) => {
              this.isLoading.set(false);
              this.storage.set('ADMIN_SESSION', JSON.stringify(res));
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              this.isLoading.set(false);
              this.errorMessage.set(err.error?.message || 'Login failed on the server');
            }
          });
        } catch (error) {
          this.isLoading.set(false);
          this.errorMessage.set('An error occurred during Google Sign-In');
        }
      },
    });

    client.requestAccessToken();
  }
}
